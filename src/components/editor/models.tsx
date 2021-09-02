// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type BlockFormat =
  | 'heading'
  | 'header-one'
  | 'header-two'
  | 'header-three'
  | 'header-four'
  | 'header-five'
  | 'header-six'
  | 'ordered-list'
  | 'unordered-list'
  | 'blockquote'
  | 'code-block';

export type MarkFormat =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'highlight'
  | 'code';

export type ParagraphElement = {
  type: 'paragraph';
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: number;
  children: CustomText[];
};

export type OrderedListElement = {
  type: 'ordered-list';
  children: CustomText[];
};

export type UnorderedListElement = {
  type: 'unordered-list';
  children: CustomText[];
};

export type ListItemElement = {
  type: 'list-item';
  children: CustomText[];
};

export type BlockQuoteElement = {
  type: 'blockquote';
  children: CustomText[];
};

export type CodeBlockElement = {
  type: 'code-block';
  children: CodeLineElement[];
};

export type CodeLineElement = {
  type: 'code-line';
  children: CustomText[];
};

export type TableElement = {
  type: 'table';
  rowCount: number;
  columnCount: number;
  children: TableRowElement[];
};

export type TableRowElement = {
  type: 'table-row';
  children: TableCellElement[];
};

export type TableCellElement = {
  type: 'table-cell';
  children: FormattedText[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | OrderedListElement
  | UnorderedListElement
  | ListItemElement
  | BlockQuoteElement
  | CodeBlockElement
  | CodeLineElement
  | TableElement
  | TableRowElement
  | TableCellElement;

export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
  strikethrough?: true;
  highlight?: true;
  code?: true;

  // for caret information
  data?: any;
  isCaret?: true;
};

export type EmptyText = {
  text: '';
};

export type CustomText = FormattedText | EmptyText;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type DocumentMetadata = {
  title: string;
};
