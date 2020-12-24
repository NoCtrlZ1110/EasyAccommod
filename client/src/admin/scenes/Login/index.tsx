import React from 'react';
import DocumentTitle from 'react-document-title';
import {enquireScreen} from 'enquire-js';
import '../../../static/style.ts';
import {Button, Card, Checkbox, Col, Form, Input, Row} from "antd";
import {toast} from "react-toastify";
import AdminBanner from "../../components/banner/AdminBanner";
import {loginAdmin} from "../../../services/auth";

let isMobile: any;

enquireScreen((b: any) => {
  isMobile = b;
});
const onFinishFailed = (errorInfo: any) => {
  toast.warn('⚠ Vui lòng nhập đầy đủ các trường');
  // console.log('Failed:', errorInfo);
};
const onFinish = (values: any) => {
  const {username, password, remember} = values;
  loginAdmin(username, password, remember);
};

class LoginAdmin extends React.PureComponent {
  state = {
    isMobile,
  };

  componentDidMount() {
    enquireScreen((b: any) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  render() {
    return (
        <DocumentTitle title='Easy Accommod'>
          <div className={'container mt-5'}>
            <Row gutter={[48, 48]}>
              <Col span={12}>
                <div className='home-wrapper'>
                  <AdminBanner isMobile={this.state.isMobile}/>
                </div>
              </Col>
              <Col span={12}>
                <Row gutter={[48, 48]}>
                  <Col span={24}>
                    <h1>Đăng nhập</h1>
                  </Col>
                  <Col span={24}>
                    <Card>
                      <Form
                          name='basic'
                          initialValues={{remember: true}}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                      >
                        <Form.Item
                            label='Tài khoản'
                            name='username'
                            rules={[
                              {required: true, message: 'Vui lòng nhập tên người dùng!'},
                            ]}
                        >
                          <Input/>
                        </Form.Item>
                        <Form.Item
                            label='Mật khẩu'
                            name='password'
                            rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                        >
                          <Input.Password/>
                        </Form.Item>
                        <Form.Item name='remember' valuePropName='checked'>
                          <Checkbox>Ghi nhớ</Checkbox>
                        </Form.Item>
                        <Form.Item>
                          <Button style={{backgroundColor: '#f5222d', color: 'white'}} htmlType={'submit'} danger>
                            Đăng nhập
                          </Button>
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </DocumentTitle>
    );
  }
}

export default LoginAdmin;
