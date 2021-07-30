import { useState, ChangeEvent } from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Input } from 'antd';

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
  const [title, setTitle] = useState('Binote Demo');
  const [editorState, setEditorState] = useState(loadContentFromLocalStorage);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    props.onTitleChange?.(newTitle);
  };

  const handleContentChange = (state: EditorState) => {
    const currentContent = state.getCurrentContent();
    saveContentToLocalStorage(currentContent);
    setEditorState(state);
  };

  return (
    <div>
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
        onChange={handleContentChange}
        placeholder="Write something!"
      />
    </div>
  );
}

export default ZEditor;
