// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Immutable from 'immutable';
import { EditorState } from 'draft-js';
import EditorPlugin, {
  EditorPluginHooks,
  EditorHostRef,
  EditorHost,
} from '../EditorPlugin';
import { diffMap } from '../diff';

function createDebuggerPlugin(): EditorPlugin {
  let editorState: EditorState = EditorState.createEmpty();

  const editorHooks: EditorPluginHooks = {
    onChange(state: EditorState): EditorState {
      const oldContent = editorState.getCurrentContent();
      const content = state.getCurrentContent();
      if (!Immutable.is(oldContent, content)) {
        const oldBlockMap = oldContent.getBlockMap();
        const blockMap = content.getBlockMap();

        const diff = diffMap(oldBlockMap, blockMap);
        console.log(diff);
        console.log(blockMap.toJS());
      }
      editorState = state;
      return state;
    },
  };
  const editorHostRef: EditorHostRef = {};

  return {
    init: (host: EditorHost) => {
      editorHostRef.current = host;
    },
    hooks: editorHooks,
  };
}

export default createDebuggerPlugin;
