import './ZEditor.css';
import { useState, ChangeEvent, MouseEvent, useRef, useEffect } from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
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
  Head7Icon,
  Head8Icon,
  Head9Icon,
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

  const QuickToolBarHeaderGroup = (
    <>
      <Button type="text" icon={<Head1Icon />}></Button>
      <Button type="text" icon={<Head2Icon />}></Button>
      <Button type="text" icon={<Head3Icon />}></Button>
      <Button type="text" icon={<Head4Icon />}></Button>
      <Button type="text" icon={<Head5Icon />}></Button>
      <Button type="text" icon={<Head6Icon />}></Button>
      <Button type="text" icon={<Head7Icon />}></Button>
      <Button type="text" icon={<Head8Icon />}></Button>
      <Button type="text" icon={<Head9Icon />}></Button>
    </>
  );

  useEffect(() => {
    editorRef.current?.focus();
  }, [editorState]);

  const QuickToolBar = (
    <>
      <Popover
        overlayClassName="bi-editor-toolbar-popover"
        content={QuickToolBarHeaderGroup}
      >
        <Button type="text" icon={<HeadNIcon />}></Button>
      </Popover>
      <Button type="text" icon={<BoldOutlined />}></Button>
      <Button type="text" icon={<ItalicOutlined />}></Button>
      <Button type="text" icon={<HighlightOutlined />}></Button>
      <Button type="text" icon={<UnderlineOutlined />}></Button>
      <Button type="text" icon={<StrikethroughOutlined />}></Button>
      <Button type="text" icon={<OrderedListOutlined />}></Button>
      <Button type="text" icon={<UnorderedListOutlined />}></Button>
      <Button type="text" icon={<QuoteIcon />}></Button>
      <Button type="text" icon={<CodeIcon />}></Button>
      <Button type="text" icon={<CodeBlockIcon />}></Button>
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
          placeholder="Write something!"
        />
      </div>
    </div>
  );
}

export default ZEditor;
