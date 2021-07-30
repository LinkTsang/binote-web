// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useState } from 'react';
import { Button, Card, Layout, Popover } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import {
  BoldOutlined,
  ItalicOutlined,
  HighlightOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  CodeOutlined,
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
  Head7Icon,
  Head8Icon,
  Head9Icon,
  QuoteIcon,
  CodeIcon,
  CodeBlockIcon,
} from '../components/icons';
import ZEditor from '../components/editor/ZEditor';

const ToolHeader = (
  <div>
    <Button icon={<Head1Icon />}></Button>
    <Button icon={<Head2Icon />}></Button>
    <Button icon={<Head3Icon />}></Button>
    <Button icon={<Head4Icon />}></Button>
    <Button icon={<Head5Icon />}></Button>
    <Button icon={<Head6Icon />}></Button>
    <Button icon={<Head7Icon />}></Button>
    <Button icon={<Head8Icon />}></Button>
    <Button icon={<Head9Icon />}></Button>
  </div>
);

function EditPage() {
  const [title, setTitle] = useState('Binote Demo');
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <p style={{ color: 'white' }}>{title ? title : 'untitled article'}</p>
      </Header>
      <div>
        <Popover content={ToolHeader}>
          <Button icon={<HeadNIcon />}></Button>
        </Popover>
        <Button icon={<BoldOutlined />}></Button>
        <Button icon={<ItalicOutlined />}></Button>
        <Button icon={<HighlightOutlined />}></Button>
        <Button icon={<UnderlineOutlined />}></Button>
        <Button icon={<StrikethroughOutlined />}></Button>
        <Button icon={<OrderedListOutlined />}></Button>
        <Button icon={<UnorderedListOutlined />}></Button>
        <Button icon={<CodeOutlined />}></Button>
        <Button icon={<EllipsisOutlined />}></Button>
        <Button icon={<QuoteIcon />}></Button>
        <Button icon={<CodeIcon />}></Button>
        <Button icon={<CodeBlockIcon />}></Button>
      </div>
      <Content>
        <Card>
          <ZEditor onTitleChange={setTitle} />
        </Card>
      </Content>
      <div style={{ height: '100%' }}></div>
    </Layout>
  );
}

export default EditPage;
