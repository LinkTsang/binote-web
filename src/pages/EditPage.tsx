// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { ChangeEvent, useCallback, useState } from 'react';
import { Card, Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import BiEditor from '../components/editor/BiEditor';
import {
  loadDraftContentFromLocalStorage,
  loadMetadataFromLocalStorage,
  saveDraftContentToLocalStorage,
  saveMetadataToLocalStorage,
} from '../components/editor/storage';
import { DocumentMetadata } from '../components/editor/models';
import { Descendant } from 'slate';

function EditPage() {
  const [metadata, setMetadata] = useState(loadMetadataFromLocalStorage);
  const handleMetadataChange = useCallback((newMetadata: DocumentMetadata) => {
    saveMetadataToLocalStorage(newMetadata);
    setMetadata(newMetadata);
  }, []);

  const [content, setContent] = useState<Descendant[]>(
    loadDraftContentFromLocalStorage
  );
  const handleContentChange = useCallback((newContent: Descendant[]) => {
    saveDraftContentToLocalStorage(newContent);
    setContent(newContent);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <p style={{ color: 'white' }}>
          {metadata.title ? metadata.title : 'untitled article'}
        </p>
      </Header>
      <Content>
        <Card>
          <div className="bi-editor">
            <BiEditor
              metadata={metadata}
              onMetadataChange={handleMetadataChange}
              content={content}
              onContentChange={handleContentChange}
            />
          </div>
        </Card>
      </Content>
    </Layout>
  );
}

export default EditPage;
