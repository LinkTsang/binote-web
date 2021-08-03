// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RichUtils, getDefaultKeyBinding } from 'draft-js';
import EditorPlugin, { EditorHost, EditorHostRef } from '../EditorPlugin';
import { ZEditorCommand } from '../ZEditor';

function createShortcutPlugin(): EditorPlugin {
  const editorHostRef: EditorHostRef = {};

  return {
    init: (host: EditorHost) => {
      editorHostRef.current = host;
    },
    keyBindingFn: (e: React.KeyboardEvent<{}>): ZEditorCommand | null => {
      const state = editorHostRef.current!.getState();
      const { updateState } = editorHostRef.current!;
      if (e.key === 'Tab') {
        const newEditorState = RichUtils.onTab(e, state, 4 /* maxDepth */);
        if (newEditorState !== state) {
          updateState(newEditorState);
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
    },
  };
}

export default createShortcutPlugin;
