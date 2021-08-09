// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Editor, Transforms, Element as SlateElement } from 'slate';
import {
  BlockFormat,
  MarkFormat,
  OrderedListElement,
  UnorderedListElement,
} from './models';

const LIST_TYPES = ['ordered-list', 'unordered-list'];
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
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
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
  return marks ? marks[format] === true : false;
};
