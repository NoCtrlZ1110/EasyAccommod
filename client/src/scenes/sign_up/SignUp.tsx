import React from 'react';
import { Form, Input, Button, Card, Tabs } from 'antd';
import { register } from '../../utils/auth';

const { TabPane } = Tabs;

export const SignUp: React.FC = () => {
  const signUpForm = (role: string) => {
    let isOwner = role === 'Owner';

    const onFinish = (values: any) => {
      console.log('Success:', values);

      values.roleNames = [role];
      if (!isOwner) {
        values.idCard = '000000000000';
        values.address = 'Hà Nội';
        values.isActive = true;
      }

      register(values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <div className="mt-4">
        <Form
          name="sign_up_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng điền tên của bạn' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Họ"
            name="surname"
            rules={[{ required: true, message: 'Vui lòng điền tên của bạn' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="userName"
            rules={[
              { required: true, message: 'Vui lòng điền tên người dùng' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emailAddress"
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
          <Form.Item
            label="SĐT"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền số điện thoại của bạn',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {isOwner && (
            <>
              <Form.Item
                label="Số CCCD"
                name="idCard"
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
            {signUpForm('Owner')}
          </TabPane>
          {/* --------------------- */}
          <TabPane tab="Người thuê trọ" key="renter">
            {signUpForm('Renter')}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};
