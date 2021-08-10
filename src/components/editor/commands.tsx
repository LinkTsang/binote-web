// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Editor,
  Transforms,
  Element as SlateElement,
  Text as SlateText,
} from 'slate';
import {
  BlockFormat,
  CodeBlockElement,
  FormattedText,
  MarkFormat,
  OrderedListElement,
  UnorderedListElement,
} from './models';

const WRAPPER_TYPES: BlockFormat[] = [
  'ordered-list',
  'unordered-list',
  'code-block',
];
const HEADING_LEVELS = {
  'header-one': 1,
  'header-two': 2,
  'header-three': 3,
  'header-four': 4,
  'header-five': 5,
  'header-six': 6,
};

export const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      SlateElement.isElement(n) &&
      WRAPPER_TYPES.includes(n.type as BlockFormat),
    split: true,
  });

  if (isActive) {
    Transforms.setNodes(editor, {
      type: 'paragraph',
    });
  } else {
    switch (format) {
      case 'ordered-list':
      case 'unordered-list': {
        Transforms.setNodes(editor, {
          type: 'list-item',
        });
        const block: OrderedListElement | UnorderedListElement = {
          type: format,
          children: [],
        };
        Transforms.wrapNodes(editor, block);
        break;
      }
      case 'header-one':
      case 'header-two':
      case 'header-three':
      case 'header-four':
      case 'header-five':
      case 'header-six': {
        Transforms.setNodes(editor, {
          type: 'heading',
          level: HEADING_LEVELS[format],
        });
        break;
      }
      case 'code-block': {
        Transforms.setNodes(editor, {
          type: 'code-line',
        });
        const block: CodeBlockElement = {
          type: format,
          children: [],
        };
        Transforms.wrapNodes(editor, block);
        break;
      }
      default: {
        Transforms.setNodes(editor, {
          type: format,
        });
      }
    }
  }
};

export const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? format in marks : false;
};

export const insertTable = (editor: Editor) => {
  Editor.insertNode(editor, {
    type: 'table',
    rowCount: 5,
    columnCount: 4,
    children: [
      {
        type: 'table-row',
        children: [{ type: 'table-cell', children: [{ text: '' }] }],
      },
    ],
  });
};
