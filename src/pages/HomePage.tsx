// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.HomePage}>
      <h1>Z-Note</h1>
      <p>Yet another note demo.</p>
      <Space>
        <Button type="primary" href="/register">
          Start
        </Button>
        <Button href="/article">Explore</Button>
      </Space>
    </div>
  );
}

export default HomePage;
