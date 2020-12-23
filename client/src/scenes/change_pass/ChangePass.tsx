import React from 'react';
import { Form, Input, Button, Card, Space, Col } from 'antd';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/auth';
import SVG from 'react-inlinesvg';

export const ChangePass: React.FC = () => {
  const onFinish = (values: any) => {
    const { currentPassword, newPassword } = values;
    changePassword(currentPassword, newPassword);
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.warn('⚠ Vui lòng nhập đầy đủ các trường');
  };

  return (
    <div className='change-pass container text-center '>
      <Space size={100}>
        <SVG width={300} src={'/svgs/password.svg'}></SVG>
        <Col>
          <div style={{ height: 60 }} />
          <h1>Đổi mật khẩu</h1>
          <Card
            className='mx-auto mt-5'
            style={{
              maxWidth: 700,
              padding: 20,
              paddingBottom: 0,
            }}
          >
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name='currentPassword'
                label='Mật khẩu hiện tại'
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu hiện tại',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name='newPassword'
                label='Mật khẩu mới'
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập mật khẩu mới',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name='confirmPassword'
                label='Nhập lại mật khẩu mới'
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập lại mật khẩu mới',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'Hai mật khẩu đã nhập không khớp, vui lòng nhập lại!'
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button className='mt-4' type='primary' htmlType='submit'>
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Space>
    </div>
  );
};
