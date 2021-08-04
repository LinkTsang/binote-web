// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { ComponentType, useState } from 'react';
import Immutable from 'immutable';
import EditorPlugin, {
  EditorHost,
  EditorHostRef,
  EditorPluginHooks,
} from '../EditorPlugin';
import { Button, Popover, Space, Tooltip } from 'antd';
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
} from '../../../icons';
import { DraftInlineStyle, EditorState, RichUtils } from 'draft-js';

const HEADER_TYPES = [
  {
    label: 'H1',
    style: 'header-one',
    icon: <Head1Icon />,
    tooltip: 'H1 (Ctrl + Alt + 1)',
  },
  {
    label: 'H2',
    style: 'header-two',
    icon: <Head2Icon />,
    tooltip: 'H2 (Ctrl + Alt + 2)',
  },
  {
    label: 'H3',
    style: 'header-three',
    icon: <Head3Icon />,
    tooltip: 'H3 (Ctrl + Alt + 3)',
  },
  {
    label: 'H4',
    style: 'header-four',
    icon: <Head4Icon />,
    tooltip: 'H4 (Ctrl + Alt + 4)',
  },
  {
    label: 'H5',
    style: 'header-five',
    icon: <Head5Icon />,
    tooltip: 'H5 (Ctrl + Alt + 5)',
  },
  {
    label: 'H6',
    style: 'header-six',
    icon: <Head6Icon />,
    tooltip: 'H6 (Ctrl + Alt + 6)',
  },
];

const MAIN_INLINE_STYLE_TYPES = [
  {
    style: 'BOLD',
    icon: <BoldOutlined />,
    tooltip: 'bold (Ctrl + B)',
  },
  {
    style: 'ITALIC',
    icon: <ItalicOutlined />,
    tooltip: 'italic (Ctrl + I)',
  },
  {
    style: 'HIGHLIGHT',
    icon: <HighlightOutlined />,
    tooltip: 'highlight (Alt + H)',
  },
  {
    style: 'UNDERLINE',
    icon: <UnderlineOutlined />,
    tooltip: 'underline (Ctrl + U)',
  },
  {
    style: 'STRIKETHROUGH',
    icon: <StrikethroughOutlined />,
    tooltip: 'strikethrough (Ctrl + Shift + X)',
  },
  { style: 'CODE', icon: <CodeIcon />, tooltip: 'code (Ctrl + J)' },
];

function StyleButton(props: {
  style: string;
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
        onClick={() => props.onToggle(props.style)}
      ></Button>
    </Tooltip>
  );
}

const MAIN_BLOCK_TYPES = [
  {
    style: 'ordered-list-item',
    icon: <OrderedListOutlined />,
    tooltip: 'ordered-list-item (Ctrl + Shift + 7)',
  },
  {
    style: 'unordered-list-item',
    icon: <UnorderedListOutlined />,
    tooltip: 'unordered-list-item (Ctrl + Shift + 8)',
  },
  {
    style: 'blockquote',
    icon: <QuoteIcon />,
    tooltip: 'blockquote (Ctrl + Shift + >)',
  },
  {
    style: 'code-block',
    icon: <CodeBlockIcon />,
    tooltip: 'code-block (Ctrl + Shift + C)',
  },
];

export interface QuickToolbarProps {}

function QuickToolBar(
  props: QuickToolbarProps & {
    editorHostRef: EditorHostRef;
    editorHooks: EditorPluginHooks;
  }
) {
  const { editorHostRef, editorHooks } = props;

  const [visible, setVisible] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState({
    x: 0,
    y: 0,
  });
  const [currentBlockType, setCurrentBlockType] = useState('');
  const [currentInlineStyle, setCurrentInlineStyle] =
    useState<DraftInlineStyle>(Immutable.OrderedSet<string>());

  const _toggleInlineStyle = (inlineStyle: string) => {
    const editorState = editorHostRef.current!.getState();
    editorHostRef.current!.updateState(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    );
  };

  const _toggleBlockStyle = (boldStyle: string) => {
    const editorState = editorHostRef.current!.getState();
    editorHostRef.current!.updateState(
      RichUtils.toggleBlockType(editorState, boldStyle)
    );
  };

  editorHooks.onMouseClick = (e: React.MouseEvent) => {
    const editorContainer = editorHostRef.current!.getContainerRef()!.current;
    if (editorContainer) {
      const editorContainerRect = editorContainer.getBoundingClientRect();
      setAnchorPosition({
        x: e.clientX - editorContainerRect.x,
        y: e.clientY - editorContainerRect.y,
      });
    }
  };

  editorHooks.onChange = (state: EditorState) => {
    const selectionState = state.getSelection();
    if (!visible && !selectionState.isCollapsed()) {
      setVisible(true);
    }
    const editorSelection = editorHostRef.current!.getState().getSelection();
    const editorContent = state.getCurrentContent();
    const editorBlockType = editorContent
      .getBlockForKey(editorSelection.getStartKey())
      .getType();
    setCurrentBlockType(editorBlockType);
    const editorInlineStyle = state.getCurrentInlineStyle();
    setCurrentInlineStyle(editorInlineStyle);
    return state;
  };

  return (
    <div
      className="bi-editor-toolbar-anchor"
      style={{
        left: `${anchorPosition.x}px`,
        top: `${anchorPosition.y}px`,
      }}
    >
      <Popover
        overlayClassName="bi-editor-toolbar-popover"
        content={
          <Space>
            <Popover
              overlayClassName="bi-editor-toolbar-popover"
              content={
                <Space>
                  {HEADER_TYPES.map((t) => (
                    <StyleButton
                      key={t.style}
                      style={t.style}
                      icon={t.icon}
                      onToggle={_toggleBlockStyle}
                      tooltip={t.tooltip}
                      active={currentBlockType === t.style}
                    ></StyleButton>
                  ))}
                </Space>
              }
            >
              <Button type="text" icon={<HeadNIcon />}></Button>
            </Popover>
            {MAIN_INLINE_STYLE_TYPES.map((t) => (
              <StyleButton
                key={t.style}
                style={t.style}
                icon={t.icon}
                onToggle={_toggleInlineStyle}
                tooltip={t.tooltip}
                active={currentInlineStyle.has(t.style)}
              ></StyleButton>
            ))}
            {MAIN_BLOCK_TYPES.map((t) => (
              <StyleButton
                key={t.style}
                style={t.style}
                icon={t.icon}
                onToggle={_toggleBlockStyle}
                tooltip={t.tooltip}
                active={currentBlockType === t.style}
              ></StyleButton>
            ))}
            <Button type="text" icon={<EllipsisOutlined />}></Button>
          </Space>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={setVisible}
      ></Popover>
    </div>
  );
}

export type QuickToolBarPlugin = EditorPlugin & {
  QuickToolBar: ComponentType<QuickToolbarProps>;
};

function createQuickToolBarPlugin(): QuickToolBarPlugin {
  const editorHooks: EditorPluginHooks = {};
  const editorHostRef: EditorHostRef = {};

  const _QuickToolBar = (props: QuickToolbarProps) => (
    <QuickToolBar
      {...props}
      editorHostRef={editorHostRef}
      editorHooks={editorHooks}
    />
  );
  return {
    init: (host: EditorHost) => {
      editorHostRef.current = host;
    },
    hooks: editorHooks,
    QuickToolBar: _QuickToolBar,
  };
}

export default createQuickToolBarPlugin;
