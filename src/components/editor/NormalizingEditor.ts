// Copyright (c) 2021 Bin Tsang
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Editor, Transforms } from "slate"

function withNormalizing<T extends Editor>(editor: T): T {
  const { normalizeNode } = editor
  editor.normalizeNode = entry => {
    const [node] = entry

    if (Editor.isEditor(node) && node.children.length === 0) {
      Transforms.insertNodes(node, { type: 'paragraph', children: [{ text: '' }] });
    }

    // Fall back to the original `normalizeNode` to enforce other constraints.
    normalizeNode(entry)
  }
  return editor;
}

export default withNormalizing;
