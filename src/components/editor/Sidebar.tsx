// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Popover, Button } from 'antd';
import ReactDOM from 'react-dom';
import { ReactEditor, useSlate } from 'slate-react';
import { PlusOutlined, TableOutlined } from '@ant-design/icons';
import { Point as SlatePoint, Node as SlateNode } from 'slate';
import { useRef } from 'react';
import { insertTable } from './commands';

export const Portal = ({ children }: { children: React.ReactNode }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export interface SidebarProps {
  hoveringPoint?: SlatePoint;
  hoveringNode?: SlateNode;
}

const Sidebar = (props: SidebarProps) => {
  const { hoveringNode } = props;
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  let hidden = true;
  let position = {
    x: 0,
    y: 0,
  };

  const selection = window.getSelection();
  if (selection?.isCollapsed) {
    const domNode = hoveringNode
      ? ReactEditor.toDOMNode(editor, hoveringNode)
      : null;
    const rect = domNode?.parentElement?.getBoundingClientRect();
    const rectX = rect ? rect.left : 0;
    const rectY = rect ? rect.top + rect.height / 2 : 0;
    const refRect = ref.current?.getBoundingClientRect();
    const offsetX = refRect ? refRect.width * 1.5 : 0;
    const offsetY = refRect ? refRect.height / 2 : 0;
    position = {
      x: window.scrollX + rectX - offsetX,
      y: window.scrollY + rectY - offsetY,
    };
    hidden = false;
  }

  const content = (
    <div>
      <Button
        icon={<TableOutlined />}
        onClick={() => insertTable(editor)}
      ></Button>
    </div>
  );

  return (
    <Portal>
      <div
        hidden={hidden}
        ref={ref}
        style={{
          position: 'absolute',
          zIndex: 1,
          left: position.x,
          top: position.y,
        }}
      >
        <Popover content={content}>
          <Button
            size="small"
            type="dashed"
            shape="circle"
            icon={<PlusOutlined />}
          />
        </Popover>
      </div>
    </Portal>
  );
};

export default Sidebar;
