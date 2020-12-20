import React from 'react';
import { Form, Input, Button, Checkbox, Card, Divider } from 'antd';
// import GoogleLoginBtn from '../../components/google_login/GoogleLoginButton';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../utils/auth';
import { toast } from 'react-toastify';
export const Login: React.FC = () => {
  const onFinish = (values: any) => {
    const { username, password, remember } = values;
    login(username, password, remember);
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.warn('⚠ Vui lòng nhập đầy đủ các trường');
    // console.log('Failed:', errorInfo);
  };

  if (localStorage.getItem('accessToken') !== null) return <Redirect to='/' />;
  else
    return (
      <div className='container text-center '>
        <div className='align-middle'>
          <div style={{ height: 60 }} />
          <h1>Đăng nhập</h1>
          <Card
            className='mx-auto mt-5'
            style={{
              maxWidth: 700,
              padding: 20,
              paddingBottom: 0,
            }}
          >
            <Form
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label='Tài khoản'
                name='username'
                rules={[
                  { required: true, message: 'Vui lòng nhập tên người dùng!' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label='Mật khẩu'
                name='password'
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name='remember' valuePropName='checked'>
                <Checkbox>Ghi nhớ</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Đăng nhập
                </Button>
              </Form.Item>
              {/* <Divider plain>hoặc</Divider>
              <Form.Item>
                <GoogleLoginBtn />
              </Form.Item> */}
              <Divider plain />
              Chưa có tài khoản ? <Link to='/signup'>Tạo tài khoản</Link>
            </Form>
          </Card>
        </div>
      </div>
    );
};
