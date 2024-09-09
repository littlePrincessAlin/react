import React from 'react';
import Styles from './index.module.scss';
import { QRCode, Button, Checkbox, Form, Input } from 'antd';
import { login, register } from 'src/service/index';

export default function Login() {
  const onFinish = (values) => {
    console.log('Success:', values);
    register(values).then((res) => {
      console.log('res', res);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.login__content}>
        <div className={Styles.login__head}>欢迎登陆</div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名/邮箱"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入您的用户名/邮箱!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入您的密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
