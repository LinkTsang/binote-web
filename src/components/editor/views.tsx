// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { RenderElementProps, RenderLeafProps } from 'slate-react';
import Caret from './Caret';
import { FormattedText } from './models';

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
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
          <pre>{children}</pre>
        </div>
      );
    case 'code-line':
      return (
        <div>
          <code>{children}</code>
        </div>
      );
    case 'table': {
      return (
        <table {...attributes}>
          <tbody>{children}</tbody>
        </table>
      );
    }
    case 'table-row': {
      return <tr {...attributes}>{children}</tr>;
    }
    case 'table-cell': {
      return <td {...attributes}>{children}</td>;
    }
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  leaf = leaf as FormattedText;

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

  const data = leaf.data;
  return (
    <span
      {...attributes}
      style={
        {
          position: 'relative',
          backgroundColor: data?.alphaColor,
        } as any
      }
    >
      {leaf.isCaret ? <Caret {...(leaf as any)} /> : null}
      {children}
    </span>
  );
};

export const renderElement = (props_: RenderElementProps) => (
  <Element {...props_} />
);
export const renderLeaf = (props_: RenderLeafProps) => <Leaf {...props_} />;
