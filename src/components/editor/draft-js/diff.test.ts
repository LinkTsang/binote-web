// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ContentState, EditorState } from 'draft-js';
import { diffMap } from './diff';

test('diff BlockMap', () => {
  const a = EditorState.createWithContent(ContentState.createFromText('a'));
  const b = EditorState.createWithContent(ContentState.createFromText('b'));
  console.log(diffMap(a.getCurrentContent().getBlockMap(), b.getCurrentContent().getBlockMap()));
});

