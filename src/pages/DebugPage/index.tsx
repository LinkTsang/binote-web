// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Layout } from 'antd';
import { Header, Content } from 'antd/lib/layout/layout';
import DatabaseInfoPanel from './DatabaseInfoPanel';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';

function DebugPage() {
  const { path } = useRouteMatch();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex' }}>
        <span style={{ color: 'white' }}>Debugger</span>
      </Header>
      <Content>
        <Router>
          <Switch>
            <Route path={`${path}/edit/:id`}>
              <DatabaseInfoPanel />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  );
}

export default DebugPage;
