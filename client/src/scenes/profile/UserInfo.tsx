import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { getCurrentUser } from '../../utils/auth';
import { useMediaQuery } from 'react-responsive';
import { API_URL } from '../../config';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Modal,
  Avatar,
  Space,
  Row,
  Descriptions,
  Badge,
  Col,
  Upload,
} from 'antd';
export const UserInfo = () => {
  const responsive = useMediaQuery({ query: '(max-width: 1500px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg'
  );
  const user = getCurrentUser();

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, [user.avatar]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const onFinish = (values: any) => {
    setEdit(false);
  };
  const onError = (values: any) => {
    console.log('Finish:', values);
  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setAvatar(imageUrl);
        setLoading(false);
      });
    }
  };

  return (
    <div className='mt-5'>
      <Row justify='center'>
        <Space>
          {!responsive && <div style={{ width: 100 }} />}
          <div>
            <Row justify='center'>
              <Space
                align='center'
                direction={isMobile ? 'vertical' : 'horizontal'}
                size={100}
              >
                <Avatar
                  size={{
                    xs: 150,
                    sm: 150,
                    md: 150,
                    lg: 150,
                    xl: 200,
                    xxl: 200,
                  }}
                  icon={<img src={avatar} alt='avatar' />}
                />
                <Col>
                  <h1>{user.surname + ' ' + user.name}</h1>
                  <Button
                    className='mt-3'
                    onClick={() => {
                      setEdit(true);
                    }}
                    style={{ borderRadius: 20 }}
                  >
                    Chỉnh sửa thông tin
                  </Button>
                </Col>
              </Space>
            </Row>
            <Row className='mt-5' justify='center' style={{ minWidth: 700 }}>
              <Space size={80} direction={isMobile ? 'vertical' : 'horizontal'}>
                <Descriptions layout='vertical' bordered>
                  <Descriptions.Item label='Họ' span={2}>
                    {user.surname}
                  </Descriptions.Item>
                  <Descriptions.Item label='Tên' span={2}>
                    {user.name}
                  </Descriptions.Item>

                  <Descriptions.Item label='Email' span={3}>
                    {user.emailAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label='Trạng thái' span={3}>
                    {user.isActive ? (
                      <Badge status='success' text='Đã được kích hoạt' />
                    ) : (
                      <Badge status='warning' text='Chưa được kích hoạt' />
                    )}
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions layout='vertical' bordered>
                  <Descriptions.Item label='ID' span={1}>
                    {user.id}
                  </Descriptions.Item>
                  <Descriptions.Item label='CMT/CCCD' span={2}>
                    {user.idCard}
                  </Descriptions.Item>
                  <Descriptions.Item label='Địa chỉ'>
                    {user.address}
                  </Descriptions.Item>
                  <Descriptions.Item label='Số điện thoại' span={2}>
                    {user.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label='Vai trò'>
                    {user.roleNames[0]}
                  </Descriptions.Item>
                  <Descriptions.Item label='Thời gian tạo tài khoản'>
                    {user.creationTime}
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Row>
          </div>

          {!responsive && <SVG src={'/svgs/teamwork.svg'} height={300} />}
        </Space>
      </Row>

      <Modal
        onCancel={() => {
          setEdit(false);
        }}
        footer={[]}
        visible={edit}
      >
        <Form
          layout='horizontal'
          className='user-info'
          onFinish={onFinish}
          onError={onError}
        >
          <>
            <h3>Thông tin cá nhân</h3>
            <br />
            <Form.Item label='Avatar'>
              <div className='user-avt'>
                <Upload
                  name='Images'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  action={`${API_URL}services/app/Apartment/UploadImageDelivery`}
                  onChange={handleChange}
                >
                  {avatar ? (
                    <img src={avatar} alt='avatar' style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </Form.Item>
            <Form.Item
              name='name'
              label='Tên'
              required={true}
              initialValue={user.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='surname'
              label='Họ'
              required={true}
              initialValue={user.surname}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='idCard'
              label='Số CMND/CCCD'
              required={true}
              initialValue={user.idCard}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='phone'
              label='Số điện thoại'
              required={true}
              initialValue={user.phone}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='emailAddress'
              label='Email'
              required={true}
              initialValue={user.emailAddress}
            >
              <Input />
            </Form.Item>
            <div className='text-center'>
              <Button
                key='back'
                onClick={() => setEdit(false)}
                style={{ backgroundColor: '#f075a5', color: 'white' }}
              >
                Huỷ
              </Button>
              <Button
                className='ml-3'
                htmlType='submit'
                style={{ backgroundColor: '#26bd88', color: 'white' }}
              >
                Cập nhật
              </Button>
            </div>
          </>
        </Form>
      </Modal>
    </div>
  );
};
