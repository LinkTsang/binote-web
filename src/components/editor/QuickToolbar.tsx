// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Button, Popover, Space, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Editor, Range } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import {
  BoldOutlined,
  ItalicOutlined,
  HighlightOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import {
  HeadNIcon,
  Head1Icon,
  Head2Icon,
  Head3Icon,
  Head4Icon,
  Head5Icon,
  Head6Icon,
  QuoteIcon,
  CodeIcon,
  CodeBlockIcon,
} from '../icons';
import {
  isBlockActive,
  isMarkActive,
  toggleBlock,
  toggleMark,
} from './commands';
import { BlockFormat, MarkFormat } from './models';

type BlockProps = {
  format: BlockFormat;
  icon: JSX.Element;
  tooltip: string;
};

const MAIN_BLOCK_TYPES: BlockProps[] = [
  {
    format: 'ordered-list',
    icon: <OrderedListOutlined />,
    tooltip: 'ordered-list (Ctrl + Shift + 7)',
  },
  {
    format: 'unordered-list',
    icon: <UnorderedListOutlined />,
    tooltip: 'unordered-list (Ctrl + Shift + 8)',
  },
  {
    format: 'blockquote',
    icon: <QuoteIcon />,
    tooltip: 'blockquote (Ctrl + Shift + >)',
  },
  {
    format: 'code-block',
    icon: <CodeBlockIcon />,
    tooltip: 'code-block (Ctrl + Shift + C)',
  },
];

const HEADER_TYPES: BlockProps[] = [
  {
    format: 'header-one',
    icon: <Head1Icon />,
    tooltip: 'H1 (Ctrl + Alt + 1)',
  },
  {
    format: 'header-two',
    icon: <Head2Icon />,
    tooltip: 'H2 (Ctrl + Alt + 2)',
  },
  {
    format: 'header-three',
    icon: <Head3Icon />,
    tooltip: 'H3 (Ctrl + Alt + 3)',
  },
  {
    format: 'header-four',
    icon: <Head4Icon />,
    tooltip: 'H4 (Ctrl + Alt + 4)',
  },
  {
    format: 'header-five',
    icon: <Head5Icon />,
    tooltip: 'H5 (Ctrl + Alt + 5)',
  },
  {
    format: 'header-six',
    icon: <Head6Icon />,
    tooltip: 'H6 (Ctrl + Alt + 6)',
  },
];

const MAIN_MARK_TYPES: {
  format: MarkFormat;
  icon: JSX.Element;
  tooltip: string;
}[] = [
  {
    format: 'bold',
    icon: <BoldOutlined />,
    tooltip: 'bold (Ctrl + B)',
  },
  {
    format: 'italic',
    icon: <ItalicOutlined />,
    tooltip: 'italic (Ctrl + I)',
  },
  {
    format: 'highlight',
    icon: <HighlightOutlined />,
    tooltip: 'highlight (Alt + H)',
  },
  {
    format: 'underline',
    icon: <UnderlineOutlined />,
    tooltip: 'underline (Ctrl + U)',
  },
  {
    format: 'strikethrough',
    icon: <StrikethroughOutlined />,
    tooltip: 'strikethrough (Ctrl + Shift + X)',
  },
  { format: 'code', icon: <CodeIcon />, tooltip: 'code (Ctrl + J)' },
];

function FormatButton(props: {
  format: string;
  icon: React.ReactNode;
  onToggle: (style: string) => void;
  tooltip?: string;
  active?: boolean;
}) {
  let className = 'bi-editor-style-button';
  if (props.active) {
    className += ' active';
  }
  return (
    <Tooltip title={props.tooltip}>
      <Button
        className={className}
        type="text"
        icon={props.icon}
        onClick={() => props.onToggle(props.format)}
      ></Button>
    </Tooltip>
  );
}

export const Portal = ({ children }: { children: React.ReactNode }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

const QuickToolbar = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const [range, setRange] = useState<globalThis.Range>();
  const [anchorPosition, setAnchorPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setVisible(false);
      return;
    }

    const domSelection = window.getSelection();
    if (!domSelection) {
      return;
    }

    const domRange = domSelection.getRangeAt(0);
    if (range === domRange) {
      return;
    }
    setRange(domRange);

    const rect = domRange.getBoundingClientRect();
    setAnchorPosition({
      x: rect.left + window.pageXOffset,
      y: rect.top + window.pageYOffset + 20, // FIXME: hard code!
    });
    setVisible(true);
  });

  return (
    <Portal>
      <div
        className="bi-editor-toolbar-anchor"
        style={{
          left: anchorPosition.x,
          top: anchorPosition.y,
        }}
      >
        <Popover
          ref={ref}
          overlayClassName="bi-editor-toolbar-popover"
          trigger="click"
          visible={visible}
          onVisibleChange={setVisible}
          content={
            <Space>
              <Popover
                overlayClassName="bi-editor-toolbar-popover"
                content={
                  <Space>
                    {HEADER_TYPES.map((t) => (
                      <FormatButton
                        key={t.format}
                        format={t.format}
                        icon={t.icon}
                        onToggle={(format) =>
                          toggleBlock(editor, format as BlockFormat)
                        }
                        tooltip={t.tooltip}
                        active={isBlockActive(editor, t.format)}
                      ></FormatButton>
                    ))}
                  </Space>
                }
              >
                <Button type="text" icon={<HeadNIcon />}></Button>
              </Popover>
              {MAIN_MARK_TYPES.map((t) => (
                <FormatButton
                  key={t.format}
                  format={t.format}
                  icon={t.icon}
                  onToggle={(format) =>
                    toggleMark(editor, format as MarkFormat)
                  }
                  tooltip={t.tooltip}
                  active={isMarkActive(editor, t.format)}
                ></FormatButton>
              ))}
              {MAIN_BLOCK_TYPES.map((t) => (
                <FormatButton
                  key={t.format}
                  format={t.format}
                  icon={t.icon}
                  onToggle={(format) =>
                    toggleBlock(editor, format as BlockFormat)
                  }
                  tooltip={t.tooltip}
                  active={isBlockActive(editor, t.format)}
                ></FormatButton>
              ))}
              <Button type="text" icon={<EllipsisOutlined />}></Button>
            </Space>
          }
        ></Popover>
      </div>
    </Portal>
  );
};

export default QuickToolbar;
