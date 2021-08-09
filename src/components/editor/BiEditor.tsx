// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Input } from 'antd';
import { useMemo, useCallback, ChangeEvent } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { DocumentMetadata } from './models';

export type BiEditorProps = {
  metadata: DocumentMetadata;
  onMetadataChange: (metadata: DocumentMetadata) => void;
  content: Descendant[];
  onContentChange: (content: Descendant[]) => void;
};

export default function BiEditor(props: BiEditorProps) {
  const { metadata, onMetadataChange, content, onContentChange } = props;

  const handleTitleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newTitle = e.target.value;
      const newDraftMetadata = { ...metadata, title: newTitle };
      onMetadataChange?.(newDraftMetadata);
    },
    [metadata, onMetadataChange]
  );

  const editor = useMemo(() => withReact(createEditor()), []);
  const handleContentChange = useCallback(
    (newContent: Descendant[]) => {
      onContentChange?.(newContent);
    },
    [onContentChange]
  );

  return (
    <Slate editor={editor} value={content} onChange={handleContentChange}>
      <p>
        <Input
          placeholder="Please enter title"
          value={metadata.title}
          onChange={handleTitleChange}
          bordered={false}
          style={{ fontSize: '3em', fontWeight: 700, padding: 0 }}
        ></Input>
      </p>
      <Editable placeholder="Write something!" />
    </Slate>
  );
}
