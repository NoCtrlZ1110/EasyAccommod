import React from 'react';
import { Form, Input, Button, Checkbox, Card, Divider } from 'antd';
import GoogleLoginBtn from '../../components/GoogleLogin/GoogleLoginButton';

export const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="container text-center ">
      <div className="align-middle">
        <h1 className="">LOGIN HERE</h1>
        <Card
          className="mx-auto "
          style={{
            maxWidth: 700,
            padding: 20,
            paddingBottom: 0,
            marginTop: 100,
          }}
        >
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
            <Divider plain>or</Divider>
            <Form.Item>
              <GoogleLoginBtn />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
