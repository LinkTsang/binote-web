import React from 'react';
import ReactDOM from 'react-dom';
import {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

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

function ZEditor() {
  const [editorState, setEditorState] = React.useState(
    loadContentFromLocalStorage
  );

  const onChange = (state: EditorState) => {
    const currentContent = state.getCurrentContent();
    saveContentToLocalStorage(currentContent);
    setEditorState(state);
  };

  return (
    <Editor
      editorState={editorState}
      onChange={onChange}
      placeholder="Write something!"
    />
  );
}

export default ZEditor;
