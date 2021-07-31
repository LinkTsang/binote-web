import './ZEditor.css';
import { useState, ChangeEvent, MouseEvent, useRef } from 'react';
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
  CodeOutlined,
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

const ToolHeader = (
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

const ToolBar = () => {
  return (
    <>
      <Popover
        overlayClassName="bi-editor-toolbar-popover"
        content={ToolHeader}
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
};

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
  const elementRef = useRef<HTMLDivElement>(null);
  const [toolbarAnchorPosition, setToolbarAnchorPosition] = useState({ x: 0, y: 0 });
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [title, setTitle] = useState('Binote Demo');
  const [editorState, setEditorState] = useState(loadContentFromLocalStorage);

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setToolbarAnchorPosition({ x: e.clientX - rect.x, y: e.clientY - rect.y });
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    props.onTitleChange?.(newTitle);
  };

  const handleEditorChange = (state: EditorState) => {
    const selectionState = state.getSelection();
    if (!selectionState.isCollapsed()) {
      setToolbarVisible(true);
    }

    const currentContent = state.getCurrentContent();
    saveContentToLocalStorage(currentContent);
    setEditorState(state);
  };

  return (
    <div className="bi-editor" ref={elementRef} onMouseUp={handleMouseUp}>
      <div
        className="bi-editor-toolbar-anchor"
        style={{
          left: `${toolbarAnchorPosition.x}px`,
          top: `${toolbarAnchorPosition.y}px`,
        }}
      >
        <Popover
          overlayClassName="bi-editor-toolbar-popover"
          content={<ToolBar />}
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
      <Editor
        editorState={editorState}
        onChange={handleEditorChange}
        placeholder="Write something!"
      />
    </div>
  );
}

export default ZEditor;
