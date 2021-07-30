// Copyright (c) 2021 Bin Tsang
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Button, Checkbox, Form, Input, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="login"
      className={styles.LoginForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item>
        <h1>Binote</h1>
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or
          <Link to="/register">register now!</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
