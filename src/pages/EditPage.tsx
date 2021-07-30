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
import ZEditor from '../components/editor/ZEditor';
import QuoteIcon from '../components/icons/QuoteIcon';
import CodeIcon from '../components/icons/CodeIcon';
import CodeBlockIcon from '../components/icons/CodeBlockIcon';

const ToolHeader = (
  <div>
    <Button>H1</Button>
    <Button>H2</Button>
    <Button>H3</Button>
    <Button>H4</Button>
    <Button>H5</Button>
    <Button>H6</Button>
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
          <Button>H</Button>
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
