// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  DraftEditorCommand,
  DraftHandleValue,
  Editor,
  EditorState,
} from 'draft-js';
import React from 'react';
import { ZEditorCommand } from './ZEditor';

export interface EditorHost {
  getState: () => EditorState;
  updateState: (editorState: EditorState) => void;
  getContainerRef: () => React.MutableRefObject<HTMLDivElement | null>;
  getEditorRef: () => React.MutableRefObject<Editor | null>;
}

export type EditorHostRef = { current?: EditorHost };

export interface EditorPluginHooks {
  onChange?: (editorState: EditorState) => EditorState;
  onMouseClick?: (e: React.MouseEvent) => void;
}

export default interface EditorPlugin {
  init?: (host: EditorHost) => void;
  destroy?: () => void;
  keyBindingFn?: (e: React.KeyboardEvent<{}>) => ZEditorCommand | null;
  handleKeyCommand?: (command: string) => DraftHandleValue;
  hooks?: EditorPluginHooks;
}
