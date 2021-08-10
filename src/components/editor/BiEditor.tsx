// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Input } from 'antd';
import { useMemo, useCallback, ChangeEvent, useState } from 'react';
import {
  createEditor,
  Descendant,
  Editor as SlateEditor,
  Point as SlatePoint,
  Node as SlateNode,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { DocumentMetadata } from './models';
import QuickToolbar from './QuickToolbar';
import Sidebar from './Sidebar';
import './style.css';
import { renderElement, renderLeaf } from './views';

export type BiEditorProps = {
  metadata: DocumentMetadata;
  onMetadataChange: (metadata: DocumentMetadata) => void;
  content: Descendant[];
  onContentChange: (content: Descendant[]) => void;
};

export default function BiEditor(props: BiEditorProps) {
  const { metadata, onMetadataChange, content, onContentChange } = props;
  const [hoveringPoint, setHoveringPoint] = useState<SlatePoint>();
  const [hoveringNode, setHoveringNode] = useState<SlateNode>();

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      const newDraftMetadata = { ...metadata, title: newTitle };
      onMetadataChange?.(newDraftMetadata);
    },
    [metadata, onMetadataChange]
  );

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const handleContentChange = useCallback(
    (newContent: Descendant[]) => {
      onContentChange?.(newContent);
    },
    [onContentChange]
  );

  const handleEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      console.log(e.key);
      // Do nothing
    },
    []
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
    <Slate editor={editor} value={content} onChange={handleContentChange}>
      <Sidebar hoveringPoint={hoveringPoint} hoveringNode={hoveringNode} />
      <QuickToolbar />
      <p>
        <Input
          placeholder="Please enter title"
          value={metadata.title}
          onChange={handleTitleChange}
          bordered={false}
          style={{ fontSize: '3em', fontWeight: 700, padding: 0 }}
        ></Input>
      </p>
      <Editable
        placeholder="Write something!"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleEditorKeyDown}
        onMouseMove={handleMouseMove}
      />
    </Slate>
  );
}
