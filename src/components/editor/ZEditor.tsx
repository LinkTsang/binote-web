import './ZEditor.css';
import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  useRef,
  useEffect,
} from 'react';
import Immutable from 'immutable';
import Draft, {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
  RichUtils,
  ContentBlock,
  getDefaultKeyBinding,
  DraftHandleValue,
  DraftEditorCommand,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Button, Input, Popover, Tooltip } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  HighlightOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import {
  HeadNIcon,
  Head1Icon,
  Head2Icon,
  Head3Icon,
  Head4Icon,
  Head5Icon,
  Head6Icon,
  QuoteIcon,
  CodeIcon,
  CodeBlockIcon,
} from '../../components/icons';

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

type CustomEditorCommand =
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

function StyleButton(props: {
  style: string;
  icon: React.ReactNode;
  onToggle: (style: string) => void;
  tooltip?: string;
}) {
  return (
    <Tooltip title={props.tooltip}>
      <Button
        type="text"
        icon={props.icon}
        onClick={() => props.onToggle(props.style)}
      ></Button>
    </Tooltip>
  );
}

function CodeBlock(props: { children?: React.ReactChildren }) {
  return <div className="bi-editor-code-block">{props.children}</div>;
}

function ZEditor(props: { onTitleChange?: (title: string) => void }) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>(null);
  const [toolbarAnchorPosition, setToolbarAnchorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [title, setTitle] = useState('Binote Demo');
  const [editorState, setEditorState] = useState(loadContentFromLocalStorage);
  const editorSelection = editorState.getSelection();
  const editorContent = editorState.getCurrentContent();
  const editorBlockType = editorContent
    .getBlockForKey(editorSelection.getStartKey())
    .getType();

  const handleEditorClick = (e: MouseEvent<HTMLDivElement>) => {
    const editorContainer = editorContainerRef.current;
    if (editorContainer) {
      const editorContainerRect = editorContainer.getBoundingClientRect();
      setToolbarAnchorPosition({
        x: e.clientX - editorContainerRect.x,
        y: e.clientY - editorContainerRect.y,
      });
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    props.onTitleChange?.(newTitle);
  };

  const updateEditorState = (state: EditorState) => {
    const currentContent = state.getCurrentContent();
    saveContentToLocalStorage(currentContent);

    setEditorState(state);
  };

  const handleEditorChange = (state: EditorState) => {
    const selectionState = state.getSelection();
    if (!toolbarVisible && !selectionState.isCollapsed()) {
      setToolbarVisible(true);
    }

    updateEditorState(state);
  };

  useEffect(() => {
    editorRef.current?.focus();
  }, [editorState]);

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      updateEditorState(newEditorState);
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

  const keyBindingFn = (
    e: React.KeyboardEvent<{}>
  ): CustomEditorCommand | null => {
    if (e.key === 'Tab') {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }
      return null;
    }
    if (e.ctrlKey) {
      if (e.altKey) {
        switch (e.key) {
          case '1':
            return 'header-one';
          case '2':
            return 'header-two';
          case '3':
            return 'header-three';
          case '4':
            return 'header-four';
          case '5':
            return 'header-five';
          case '6':
            return 'header-six';
        }
      }
      if (e.shiftKey) {
        switch (e.key) {
          case 'X':
            return 'strikethrough';
          case '&': // 7
            return 'ordered-list-item';
          case '*': // 8
            return 'unordered-list-item';
          case '>':
            return 'blockquote';
          case 'C':
            return 'code-block';
        }
      }
    }
    if (e.altKey) {
      switch (e.key) {
        case 'h':
          return 'highlight';
      }
    }
    return getDefaultKeyBinding(e);
  };

  const _toggleInlineStyle = (inlineStyle: string) => {
    updateEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const _toggleBlockStyle = (boldStyle: string) => {
    updateEditorState(RichUtils.toggleBlockType(editorState, boldStyle));
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

  const QuickToolBar = (
    <>
      <Popover
        overlayClassName="bi-editor-toolbar-popover"
        content={[
          {
            label: 'H1',
            style: 'header-one',
            icon: <Head1Icon />,
            tooltip: 'H1 (Ctrl + Alt + 1)',
          },
          {
            label: 'H2',
            style: 'header-two',
            icon: <Head2Icon />,
            tooltip: 'H2 (Ctrl + Alt + 2)',
          },
          {
            label: 'H3',
            style: 'header-three',
            icon: <Head3Icon />,
            tooltip: 'H3 (Ctrl + Alt + 3)',
          },
          {
            label: 'H4',
            style: 'header-four',
            icon: <Head4Icon />,
            tooltip: 'H4 (Ctrl + Alt + 4)',
          },
          {
            label: 'H5',
            style: 'header-five',
            icon: <Head5Icon />,
            tooltip: 'H5 (Ctrl + Alt + 5)',
          },
          {
            label: 'H6',
            style: 'header-six',
            icon: <Head6Icon />,
            tooltip: 'H6 (Ctrl + Alt + 6)',
          },
        ].map((t) => (
          <StyleButton
            style={t.style}
            icon={t.icon}
            onToggle={_toggleBlockStyle}
            tooltip={t.tooltip}
          ></StyleButton>
        ))}
      >
        <Button type="text" icon={<HeadNIcon />}></Button>
      </Popover>
      {[
        {
          style: 'BOLD',
          icon: <BoldOutlined />,
          tooltip: 'bold (Ctrl + B)',
        },
        {
          style: 'ITALIC',
          icon: <ItalicOutlined />,
          tooltip: 'italic (Ctrl + I)',
        },
        {
          style: 'HIGHLIGHT',
          icon: <HighlightOutlined />,
          tooltip: 'highlight (Alt + H)',
        },
        {
          style: 'UNDERLINE',
          icon: <UnderlineOutlined />,
          tooltip: 'underline (Ctrl + U)',
        },
        {
          style: 'STRIKETHROUGH',
          icon: <StrikethroughOutlined />,
          tooltip: 'strikethrough (Ctrl + Shift + X)',
        },
        { style: 'CODE', icon: <CodeIcon />, tooltip: 'code (Ctrl + J)' },
      ].map((t) => (
        <StyleButton
          style={t.style}
          icon={t.icon}
          onToggle={_toggleInlineStyle}
          tooltip={t.tooltip}
        ></StyleButton>
      ))}
      {[
        {
          style: 'ordered-list-item',
          icon: <OrderedListOutlined />,
          tooltip: 'ordered-list-item (Ctrl + Shift + 7)',
        },
        {
          style: 'unordered-list-item',
          icon: <UnorderedListOutlined />,
          tooltip: 'unordered-list-item (Ctrl + Shift + 8)',
        },
        {
          style: 'blockquote',
          icon: <QuoteIcon />,
          tooltip: 'blockquote (Ctrl + Shift + >)',
        },
        {
          style: 'code-block',
          icon: <CodeBlockIcon />,
          tooltip: 'code-block (Ctrl + Shift + C)',
        },
      ].map((t) => (
        <StyleButton
          style={t.style}
          icon={t.icon}
          onToggle={_toggleBlockStyle}
          tooltip={t.tooltip}
        ></StyleButton>
      ))}
      <Button type="text" icon={<EllipsisOutlined />}></Button>
    </>
  );

  return (
    <div className="bi-editor" ref={editorContainerRef}>
      <div
        className="bi-editor-toolbar-anchor"
        style={{
          left: `${toolbarAnchorPosition.x}px`,
          top: `${toolbarAnchorPosition.y}px`,
        }}
      >
        <Popover
          overlayClassName="bi-editor-toolbar-popover"
          content={QuickToolBar}
          trigger="click"
          visible={toolbarVisible}
          onVisibleChange={setToolbarVisible}
        ></Popover>
      </div>
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
