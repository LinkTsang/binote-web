// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Descendant } from 'slate';
import { DocumentMetadata } from './models';

const INITIAL_TEXT_TEMPLATE: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Hello BiEditor!' }],
  },
];

export const LOCAL_STORAGE_METADATA_ITEM = 'bi-editor-draft-metadata';
export const LOCAL_STORAGE_CONTENT_ITEM = 'bi-editor-draft-content';
export type ItemName =
  | typeof LOCAL_STORAGE_METADATA_ITEM
  | typeof LOCAL_STORAGE_CONTENT_ITEM;

export function loadFromLocalStorage(
  key: ItemName,
  defaultValue?: unknown
): unknown {
  const content = window.localStorage.getItem(key);
  if (content) {
    return JSON.parse(content);
  } else {
    return defaultValue;
  }
}

export function saveToLocalStorage(key: ItemName, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadMetadataFromLocalStorage(): DocumentMetadata {
  return loadFromLocalStorage(
    LOCAL_STORAGE_METADATA_ITEM,
    ''
  ) as DocumentMetadata;
}

export function saveMetadataToLocalStorage(metadata: DocumentMetadata) {
  saveToLocalStorage(LOCAL_STORAGE_METADATA_ITEM, metadata);
}

export function loadDraftContentFromLocalStorage(): Descendant[] {
  return loadFromLocalStorage(
    LOCAL_STORAGE_CONTENT_ITEM,
    INITIAL_TEXT_TEMPLATE
  ) as Descendant[];
}

export function saveDraftContentToLocalStorage(content: Descendant[]) {
  saveToLocalStorage(LOCAL_STORAGE_CONTENT_ITEM, content);
}
