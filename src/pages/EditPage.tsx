// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { useCallback, useState } from 'react';
import { Card, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import BiEditor, { ServerStatus } from '../components/editor/BiEditor';
import {
  loadMetadataFromLocalStorage,
  saveMetadataToLocalStorage,
} from '../components/editor/storage';
import { DocumentMetadata } from '../components/editor/models';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';

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
  const [metadata, setMetadata] = useState(loadMetadataFromLocalStorage);
  const [serverStatus, setServerStatus] = useState<ServerStatus>('offline');
  const handleMetadataChange = useCallback((newMetadata: DocumentMetadata) => {
    saveMetadataToLocalStorage(newMetadata);
    setMetadata(newMetadata);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div style={{ display: 'flex' }}>
          <span style={{ color: 'white' }}>
            {metadata.title ? metadata.title : 'untitled article'}
          </span>
          <div style={{ marginLeft: 'auto' }}>
            <ServerStatusWidget status={serverStatus} />
          </div>
        </div>
      </Header>
      <Content>
        <Card>
          <div className="bi-editor">
            <BiEditor
              metadata={metadata}
              onMetadataChange={handleMetadataChange}
              onServerStatusChange={setServerStatus}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

export default EditPage;
