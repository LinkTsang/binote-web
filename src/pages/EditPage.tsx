// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useState } from 'react';
import { Card, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import BiEditor, { ServerStatus } from '../components/editor/BiEditor';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';

function ServerStatusWidget({ status }: { status: ServerStatus }) {
  return status === 'offline' ? (
    <span style={{ color: 'yellow' }}>
      <WarningOutlined /> {status}
    </span>
  ) : (
    <span style={{ color: 'green' }}>
      <CheckCircleOutlined /> {status}
    </span>
  );
}

function EditPage() {
  const { id: documentId } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [serverStatus, setServerStatus] = useState<ServerStatus>('offline');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div style={{ display: 'flex' }}>
          <span style={{ color: 'white' }}>{title ? title : 'untitled'}</span>
          <div style={{ marginLeft: 'auto' }}>
            <ServerStatusWidget status={serverStatus} />
          </div>
        </div>
      </Header>
      <Content>
        <Card>
          <div className="bi-editor">
            <BiEditor
              documentId={documentId}
              onTitleChange={setTitle}
              onServerStatusChange={setServerStatus}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

export default EditPage;
