import React from 'react';
import { Form, Input, Button, Checkbox, Card, Divider } from 'antd';
import GoogleLoginBtn from '../../components/GoogleLogin/GoogleLoginButton';
import { Link, Redirect } from 'react-router-dom';

export const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (localStorage.getItem('accessT oken') !== null) return <Redirect to="/" />;
  else
    return (
      <div className="container text-center ">
        <div className="align-middle">
          <h1 style={{ marginTop: 90 }}>Đăng nhập</h1>
          <Card
            className="mx-auto "
            style={{
              maxWidth: 700,
              padding: 20,
              paddingBottom: 0,
            }}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Divider plain>or</Divider>
              <Form.Item>
                <GoogleLoginBtn />
              </Form.Item>
              <Divider plain>
                Not a member yet? <Link to="/signup">Create account</Link>
              </Divider>
            </Form>
          </Card>
        </div>
      </div>
    );
};
