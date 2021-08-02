import './ZEditor.css';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Immutable from 'immutable';
import Draft, {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
  RichUtils,
  ContentBlock,
  DraftHandleValue,
  DraftEditorCommand,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Input } from 'antd';
import EditorPlugin from './EditorPlugin';

const loadContentFromLocalStorage = () => {
  const content = window.localStorage.getItem('content');
  if (content) {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  } else {
    return EditorState.createEmpty();
  }
};

const saveContentToLocalStorage = (content: ContentState) => {
  window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
};

export type ZEditorCommand =
  | DraftEditorCommand
  | 'strikethrough'
  | 'highlight'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six'
  | 'ordered-list-item'
  | 'unordered-list-item'
  | 'blockquote'
  | 'code-block';

function CodeBlock(props: { children?: React.ReactChildren }) {
  return <div className="bi-editor-code-block">{props.children}</div>;
}

function ZEditor(
  props: {
    plugins: EditorPlugin[];
    onTitleChange?: (title: string) => void;
  } = { plugins: [], onTitleChange: undefined }
) {
  const { plugins, onTitleChange } = props;
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>(null);
  const [title, setTitle] = useState('Binote Demo');
  const [editorState, setEditorState] = useState(loadContentFromLocalStorage);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitleChange?.(newTitle);
  };

  useEffect(() => {
    editorRef.current?.focus();
  }, [editorState]);

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      handleEditorChange(newEditorState);
      return 'handled';
    }
    switch (command) {
      case 'header-one':
      case 'header-two':
      case 'header-three':
      case 'header-four':
      case 'header-five':
      case 'header-six':
      case 'ordered-list-item':
      case 'unordered-list-item':
      case 'blockquote':
      case 'code-block':
        _toggleBlockStyle(command);
        return 'handled';
    }
    switch (command) {
      case 'strikethrough':
      case 'highlight':
        _toggleInlineStyle(command.toUpperCase());
        return 'handled';
    }
    console.warn('Not handled key command:', command);
    return 'not-handled';
  };

  const keyBindingFn = (e: React.KeyboardEvent<{}>): ZEditorCommand | null => {
    for (const plugin of plugins) {
      const command = plugin.keyBindingFn?.(e);
      if (command) {
        return command;
      }
    }
    return null;
  };
  const _toggleInlineStyle = (inlineStyle: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const _toggleBlockStyle = (boldStyle: string) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, boldStyle));
  };

  const CUSTOM_STYLE_MAP = {
    STRIKETHROUGH: {
      textDecoration: 'line-through',
    },
    HIGHLIGHT: {
      backgroundColor: '#FFFF00',
    },
    CODE: {
      margin: '0 0.2em',
      padding: '0.2em 0.4em 0.1em',
      fontSize: '85%',
      background: 'rgba(150, 150, 150, 0.1)',
      border: '1px solid rgba(100, 100, 100, 0.2)',
      borderRadius: '3px',
    },
  };

  const blockRenderMap = Immutable.Map({
    'code-block': {
      element: 'pre',
      wrapper: <CodeBlock />,
    },
  });
  const extendedBlockRenderMap =
    Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

  const blockStyleFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'bi-editor-blockquote';
    }
    return 'bi-editor-unstyled';
  };

  const handleEditorClick = (e: React.MouseEvent) => {
    for (const plugin of plugins) {
      plugin.hooks?.onMouseClick?.(e);
    }
  };

  const handleEditorChange = (state: EditorState) => {
    for (const plugin of plugins) {
      const hooks = plugin.hooks;
      if (hooks?.onChange) {
        state = hooks.onChange(state);
      }
    }

    const currentContent = state.getCurrentContent();
    saveContentToLocalStorage(currentContent);

    setEditorState(state);
  };

  const editorHost = {
    getState: () => editorState,
    updateState: handleEditorChange,
    getContainerRef: () => editorContainerRef,
    getEditorRef: () => editorRef,
  };
  for (const plugin of plugins) {
    plugin.init?.(editorHost);
  }

  return (
    <div className="bi-editor" ref={editorContainerRef}>
      <p>
        <Input
          placeholder="Please enter title"
          value={title}
          onChange={handleTitleChange}
          bordered={false}
          style={{ fontSize: '3em', fontWeight: 700, padding: 0 }}
        ></Input>
      </p>
      <div onClick={handleEditorClick}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          placeholder="Write something!"
          blockStyleFn={blockStyleFn}
          blockRenderMap={extendedBlockRenderMap}
          customStyleMap={CUSTOM_STYLE_MAP}
        />
      </div>
    </div>
  );
}

export default ZEditor;
