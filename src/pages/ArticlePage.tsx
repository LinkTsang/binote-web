// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Card, Typography, Affix, Button, Layout, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function ArticlePage() {
  return (
    <Layout>
      <Layout.Content>
        <Card>
          <Typography>
            <Typography.Title>Binote</Typography.Title>
            <Typography.Paragraph>
              <Typography.Text code>Binote</Typography.Text>
              is yet another note application for reading, writing and sharing!
            </Typography.Paragraph>
          </Typography>
        </Card>
      </Layout.Content>
      <Affix style={{ position: 'absolute', bottom: '32px', right: '32px' }}>
        <Tooltip title="edit">
          <Button
            type="primary"
            href="/edit"
            shape="circle"
            size="large"
            icon={<EditOutlined />}
          />
        </Tooltip>
      </Affix>
    </Layout>
  );
}

export default ArticlePage;
