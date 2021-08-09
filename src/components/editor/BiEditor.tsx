// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Input } from 'antd';
import { useMemo, useCallback, ChangeEvent } from 'react';
import { createEditor, Descendant } from 'slate';
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { DocumentMetadata } from './models';
import QuickToolbar from './QuickToolbar';
import './style.css';

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'heading':
      switch (element.level) {
        case 1:
          return <h1 {...attributes}>{children}</h1>;
        case 2:
          return <h2 {...attributes}>{children}</h2>;
        case 3:
          return <h3 {...attributes}>{children}</h3>;
        case 4:
          return <h4 {...attributes}>{children}</h4>;
        case 5:
          return <h5 {...attributes}>{children}</h5>;
        case 6:
          return <h6 {...attributes}>{children}</h6>;
        default:
          return <h6 {...attributes}>{children}</h6>;
      }
    case 'ordered-list':
      return (
        <ol className="bi-editor-list" {...attributes}>
          {children}
        </ol>
      );
    case 'unordered-list':
      return (
        <ul className="bi-editor-list" {...attributes}>
          {children}
        </ul>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'blockquote':
      return (
        <blockquote className="bi-editor-blockquote" {...attributes}>
          {children}
        </blockquote>
      );
    case 'code-block':
      return (
        <div className="bi-editor-code-block" {...attributes}>
          <pre>
            <code>{children}</code>
          </pre>
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: 'line-through' }}>{children}</span>
    );
  }

  if (leaf.highlight) {
    children = (
      <span
        style={{
          backgroundColor: '#FFFF00',
        }}
      >
        {children}
      </span>
    );
  }

  if (leaf.code) {
    children = (
      <code
        style={{
          margin: '0 0.2em',
          padding: '0.2em 0.4em 0.1em',
          fontSize: '85%',
          background: 'rgba(150, 150, 150, 0.1)',
          border: '1px solid rgba(100, 100, 100, 0.2)',
          borderRadius: '3px',
        }}
      >
        {children}
      </code>
    );
  }

  return <span {...attributes}>{children}</span>;
};

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

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const handleContentChange = useCallback(
    (newContent: Descendant[]) => {
      onContentChange?.(newContent);
    },
    [onContentChange]
  );

  const renderElement = useCallback(
    (props_: RenderElementProps) => <Element {...props_} />,
    []
  );
  const renderLeaf = useCallback(
    (props_: RenderLeafProps) => <Leaf {...props_} />,
    []
  );

  return (
    <Slate editor={editor} value={content} onChange={handleContentChange}>
      <QuickToolbar />
      <p>
        <Input
          placeholder="Please enter title"
          value={metadata.title}
          onChange={handleTitleChange}
          bordered={false}
          style={{ fontSize: '3em', fontWeight: 700, padding: 0 }}
        ></Input>
      </p>
      <Editable
        placeholder="Write something!"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}
