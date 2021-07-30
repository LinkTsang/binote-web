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
  <div>
    <Button icon={<Head1Icon />}></Button>
    <Button icon={<Head2Icon />}></Button>
    <Button icon={<Head3Icon />}></Button>
    <Button icon={<Head4Icon />}></Button>
    <Button icon={<Head5Icon />}></Button>
    <Button icon={<Head6Icon />}></Button>
    <Button icon={<Head7Icon />}></Button>
    <Button icon={<Head8Icon />}></Button>
    <Button icon={<Head9Icon />}></Button>
  </div>
);

const ToolBar = () => {
  return (
    <div>
      <Popover content={ToolHeader}>
        <Button icon={<HeadNIcon />}></Button>
      </Popover>
      <Button icon={<BoldOutlined />}></Button>
      <Button icon={<ItalicOutlined />}></Button>
      <Button icon={<HighlightOutlined />}></Button>
      <Button icon={<UnderlineOutlined />}></Button>
      <Button icon={<StrikethroughOutlined />}></Button>
      <Button icon={<OrderedListOutlined />}></Button>
      <Button icon={<UnorderedListOutlined />}></Button>
      <Button icon={<CodeOutlined />}></Button>
      <Button icon={<EllipsisOutlined />}></Button>
      <Button icon={<QuoteIcon />}></Button>
      <Button icon={<CodeIcon />}></Button>
      <Button icon={<CodeBlockIcon />}></Button>
    </div>
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [title, setTitle] = useState('Binote Demo');
  const [editorState, setEditorState] = useState(loadContentFromLocalStorage);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.x, y: e.clientY - rect.y });
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    props.onTitleChange?.(newTitle);
  };

  const handleEditorChange = (state: EditorState) => {
    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
      setToolbarVisible(true);
    }

    const currentContent = state.getCurrentContent();
    saveContentToLocalStorage(currentContent);
    setEditorState(state);
  };

  return (
    <div ref={elementRef} onMouseMove={handleMouseMove}>
      <div
        style={{
          position: 'absolute',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      >
        <Popover
          content={<ToolBar />}
          trigger="click"
          visible={toolbarVisible}
          onVisibleChange={setToolbarVisible}
          arrowPointAtCenter={false}
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
