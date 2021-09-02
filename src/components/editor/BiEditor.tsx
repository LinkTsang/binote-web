// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useMemo, useCallback, ChangeEvent, useState, useEffect } from 'react';
import { Input, message } from 'antd';

import {
  createEditor,
  Descendant,
  Editor as SlateEditor,
  Point as SlatePoint,
  Node as SlateNode,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';

import * as Y from 'yjs';
import {
  withYjs,
  withCursor,
  useCursors,
  SyncElement,
  toSharedType,
} from 'slate-yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import { WebsocketProvider } from 'y-websocket';

import randomColor from 'randomcolor';

import QuickToolbar from './QuickToolbar';
import Sidebar from './Sidebar';
import './style.css';
import { renderElement, renderLeaf } from './views';
import { withTables } from './table';
import { mapHotkeyToCommand } from './hotkeys';
import { executeCommand } from './commands';
import withNormalizing from './NormalizingEditor';

const ROOM_NAME_PREFIX = 'bi-editor-doc';

const WEBSOCKET_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'wss://demos.yjs.dev/slate-demo'
    : 'ws://localhost:1234';

const REMOTE_SYNC_SERVER_STATUS_KEY = 'REMOTE_SYNC_SERVER_STATUS_KEY';

export type ServerStatus = 'online' | 'offline';

const EMPTY_CONTENT: Descendant[] = [
  { type: 'paragraph', children: [{ text: '' }] },
];

export type BiEditorProps = {
  documentId: string;
  onTitleChange: (title: string) => void;
  onServerStatusChange?: (status: ServerStatus) => void;
};

export default function BiEditor(props: BiEditorProps) {
  const { documentId, onTitleChange, onServerStatusChange } = props;
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(EMPTY_CONTENT);
  const [hoveringPoint, setHoveringPoint] = useState<SlatePoint>();
  const [hoveringNode, setHoveringNode] = useState<SlateNode>();

  const name = 'Link';
  const color = useMemo(
    () =>
      randomColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: 1,
      }),
    []
  );

  const [sharedMeta, sharedContent, persistence, provider] = useMemo(() => {
    const _doc = new Y.Doc();

    const _sharedMeta = _doc.getMap('meta');
    const _sharedContent = _doc.getArray<SyncElement>('content');

    const room_name = `${ROOM_NAME_PREFIX}-${documentId}`;
    const _persistence = new IndexeddbPersistence(room_name, _doc);

    const _provider = new WebsocketProvider(
      WEBSOCKET_ENDPOINT,
      room_name,
      _doc,
      {
        connect: false,
      }
    );

    return [_sharedMeta, _sharedContent, _persistence, _provider];
  }, [documentId]);

  const sharedMetaCallback = useCallback(
    (e: Y.YMapEvent<any>) => {
      e.changes.keys.forEach((change, key) => {
        switch (key) {
          case 'title': {
            const _title = sharedMeta.get('title');
            setTitle(_title);
            onTitleChange?.(_title);
            break;
          }
          default: {
            console.error(`unknown key ${key}`);
          }
        }
      });
    },
    [onTitleChange, sharedMeta]
  );

  useEffect(() => {
    sharedMeta.observe(sharedMetaCallback);
    return () => {
      sharedMeta.unobserve(sharedMetaCallback);
    };
  }, [sharedMeta, sharedMetaCallback]);

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      sharedMeta.set('title', newTitle);
    },
    [sharedMeta]
  );

  useEffect(() => {
    persistence.once('synced', () => {
      if (sharedContent.length === 0) {
        toSharedType(sharedContent, EMPTY_CONTENT);
      }
      message.info({ content: 'loaded from local.', duration: 1 });
    });
  }, [persistence, sharedContent]);

  const editor = useMemo(() => {
    return withCursor(
      withYjs(
        withNormalizing(withHistory(withTables(withReact(createEditor())))),
        sharedContent
      ),
      provider.awareness
    );
  }, [provider.awareness, sharedContent]);

  useEffect(() => {
    provider.on('status', ({ status }: { status: string }) => {
      switch (status) {
        case 'connecting': {
          message.loading({
            content: 'server connecting',
            key: REMOTE_SYNC_SERVER_STATUS_KEY,
            duration: 3,
          });
          onServerStatusChange?.('offline');
          break;
        }
        case 'connected': {
          message.info({
            content: 'server connected',
            REMOTE_SYNC_SERVER_STATUS_KEY,
            duration: 2,
          });
          onServerStatusChange?.('online');
          break;
        }
        case 'disconnected': {
          message.info({
            content: 'server disconnected',
            REMOTE_SYNC_SERVER_STATUS_KEY,
            duration: 3,
          });
          onServerStatusChange?.('offline');
          break;
        }
        default: {
          message.info({
            content: `unknown server status: ${status}`,
            REMOTE_SYNC_SERVER_STATUS_KEY,
            duration: 3,
          });
          console.error(`unknown server status: ${status}`);
        }
      }
    });

    provider.awareness.setLocalState({
      alphaColor: color.slice(0, -2) + '0.2)',
      color: color,
      name: name,
    });

    // Super hacky way to provide a initial value from the client, if
    // you plan to use y-websocket in prod you probably should provide the
    // initial state from the server.
    provider.on('sync', (isSynced: boolean) => {
      console.log('sync', isSynced);
      if (isSynced && sharedContent.length === 0) {
        toSharedType(sharedContent, EMPTY_CONTENT);
      }
    });

    provider.connect();

    return () => {
      provider.disconnect();
    };
  }, [color, onServerStatusChange, provider, sharedContent]);

  const { decorate } = useCursors(editor);
  const renderLeafWithCursors = useCallback(renderLeaf, [decorate]);

  const handleEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const command = mapHotkeyToCommand(e.nativeEvent);
      if (command) {
        e.preventDefault();
        executeCommand(editor, command);
      }
    },
    [editor]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const range = ReactEditor.findEventRange(editor, e);
      setHoveringPoint(range.focus);
      setHoveringNode(SlateEditor.node(editor, range.focus)[0]);
    },
    [editor]
  );

  return (
    <Slate editor={editor} value={value} onChange={(v) => setValue(v)}>
      <Sidebar hoveringPoint={hoveringPoint} hoveringNode={hoveringNode} />
      <QuickToolbar />
      <p>
        <Input
          placeholder="Please enter title"
          value={title}
          onChange={handleTitleChange}
          bordered={false}
          style={{ fontSize: '3em', fontWeight: 700, padding: 0 }}
        ></Input>
      </p>
      <Editable
        placeholder="Write something!"
        spellCheck={false}
        renderElement={renderElement}
        renderLeaf={renderLeafWithCursors}
        decorate={decorate}
        onKeyDown={handleEditorKeyDown}
        onMouseMove={handleMouseMove}
      />
    </Slate>
  );
}
