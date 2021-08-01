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
import { Button, Input, Popover } from 'antd';
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

function StyleButton(props: {
  style: string;
  icon: React.ReactNode;
  onToggle: (style: string) => void;
}) {
  return (
    <Button
      type="text"
      icon={props.icon}
      onClick={() => props.onToggle(props.style)}
    ></Button>
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
    console.warn('Not handled key command:', command);
    return 'not-handled';
  };

  const keyBindingFn = (
    e: React.KeyboardEvent<{}>
  ): DraftEditorCommand | null => {
    if (e.key === 'Tab') {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        handleEditorChange(newEditorState);
      }
      return null;
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
          { label: 'H1', style: 'header-one', icon: <Head1Icon /> },
          { label: 'H2', style: 'header-two', icon: <Head2Icon /> },
          { label: 'H3', style: 'header-three', icon: <Head3Icon /> },
          { label: 'H4', style: 'header-four', icon: <Head4Icon /> },
          { label: 'H5', style: 'header-five', icon: <Head5Icon /> },
          { label: 'H6', style: 'header-six', icon: <Head6Icon /> },
        ].map((t) => (
          <StyleButton
            style={t.style}
            icon={t.icon}
            onToggle={_toggleBlockStyle}
          ></StyleButton>
        ))}
      >
        <Button type="text" icon={<HeadNIcon />}></Button>
      </Popover>
      {[
        { style: 'BOLD', icon: <BoldOutlined /> },
        { style: 'ITALIC', icon: <ItalicOutlined /> },
        { style: 'HIGHLIGHT', icon: <HighlightOutlined /> },
        { style: 'UNDERLINE', icon: <UnderlineOutlined /> },
        { style: 'STRIKETHROUGH', icon: <StrikethroughOutlined /> },
        { style: 'CODE', icon: <CodeIcon /> },
      ].map((t) => (
        <StyleButton
          style={t.style}
          icon={t.icon}
          onToggle={_toggleInlineStyle}
        ></StyleButton>
      ))}
      {[
        { style: 'ordered-list-item', icon: <OrderedListOutlined /> },
        { style: 'unordered-list-item', icon: <UnorderedListOutlined /> },
        { style: 'blockquote', icon: <QuoteIcon /> },
        { style: 'code-block', icon: <CodeBlockIcon /> },
      ].map((t) => (
        <StyleButton
          style={t.style}
          icon={t.icon}
          onToggle={_toggleBlockStyle}
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
