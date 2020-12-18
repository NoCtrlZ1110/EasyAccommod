import React from 'react';
import { Form, Input, Button, Card, Tabs } from 'antd';

const { TabPane } = Tabs;

export const SignUp: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const signUpForm = (role: string) => {
    let isOwner = role === 'owner';
    return (
      <div className="mt-4">
        <Form
          name="sign_up_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng điền tên của bạn' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng điền tên người dùng' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng điền email của bạn' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password />
          </Form.Item>
          {isOwner && (
            <>
              <Form.Item
                label="Số CCCD"
                name="id_number"
                rules={[
                  { required: true, message: 'Vui lòng điền số CCCD của bạn' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  { required: true, message: 'Vui lòng điền địa chỉ của bạn' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="SĐT"
                name="phone_number"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền số điện thoại của bạn',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return (
    <div className="sign-up text-center">
      <h1>Tạo tài khoản mới</h1>

      <Card
        className="mx-auto "
        style={{
          maxWidth: 700,
          padding: 20,
          paddingBottom: 0,
          marginTop: 50,
        }}
      >
        <Tabs defaultActiveKey="1" onChange={() => {}}>
          <TabPane tab="Chủ nhà trọ" key="owner">
            {signUpForm('owner')}
          </TabPane>
          {/* --------------------- */}
          <TabPane tab="Người thuê trọ" key="renter">
            {signUpForm('renter')}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};
