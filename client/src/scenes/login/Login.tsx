import React from 'react';
import { Form, Input, Button, Checkbox, Card, Divider, Space, Row } from 'antd';
import SVG from 'react-inlinesvg';

import { Link, Redirect } from 'react-router-dom';
import { login } from '../../services/auth';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
export const Login: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

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
        <Row justify='center'>
          <Space
            direction={isMobile ? 'vertical' : 'horizontal'}
            size={isMobile ? -50 : 100}
          >
            <SVG width={250} src={'/svgs/password.svg'}></SVG>

            <div style={{ minWidth: isMobile ? 300 : 600 }}>
              {!isMobile && <div style={{ height: 60 }} />}
              <h1>Đăng nhập</h1>
              <Card
                className='mt-5'
                style={{
                  // maxWidth: 700,
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
                      {
                        required: true,
                        message: 'Vui lòng nhập tên người dùng!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label='Mật khẩu'
                    name='password'
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    ]}
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
          </Space>
        </Row>
        <Divider plain />
      </div>
    );
};
