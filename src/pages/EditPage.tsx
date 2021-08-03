// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useState } from 'react';
import { Card, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import ZEditor from '../components/editor/ZEditor';
import {
  createShortcutPlugin,
  createQuickToolBarPlugin,
} from '../components/editor/plugins';

const shortcutPlugin = createShortcutPlugin();
const quickToolBarPlugin = createQuickToolBarPlugin();
const { QuickToolBar } = quickToolBarPlugin;

function EditPage() {
  const [title, setTitle] = useState('Binote Demo');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <p style={{ color: 'white' }}>{title ? title : 'untitled article'}</p>
      </Header>
      <Content>
        <Card>
          <ZEditor
            plugins={[shortcutPlugin, quickToolBarPlugin]}
            onTitleChange={setTitle}
          />
          <QuickToolBar />
        </Card>
      </Content>
      <div style={{ height: '100%' }}></div>
    </Layout>
  );
}

export default EditPage;
