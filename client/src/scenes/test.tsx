import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Row,
  Space,
  Upload,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { API_URL } from '../config';
import { getUser, updateUser } from '../services/auth';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';

export const TEST = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(
    'https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg'
  );
  const user = getUser();

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
    values.isActive = true;
    values.id = user.id;
    updateUser(values);
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
  const listSuggestPost = [];
  const listSuggestPostTitle = [
    'Phòng trọ giá rẻ',
    'Phòng cho nữ',
    'Phòng cho nữ',
    'Phòng trọ giá rẻ',
    'Phòng cho nữ',
    'Phòng trọ giá rẻ',
    'Phòng trọ giá rẻ',
    'Phòng trọ giá rẻ',
    'Phòng trọ giá rẻ',
    'Phòng cho nữ',
  ];
  const listPriceSuggestPost = [
    '1 Triệu',
    '2 Triệu',
    '10 Triệu',
    '3.2 Triệu',
    '1 Triệu',
    '2 Triệu',
    '1 Triệu',
    '2 Triệu',
    '1 Triệu',
    '2 Triệu',
  ];
  for (let i = 0; i < 10; i++) {
    listSuggestPost.push({
      href: '',
      title: listPriceSuggestPost[i],
      content: listSuggestPostTitle[i],
    });
  }
  return (
    <Row className='renter-profile container'>
      <Col span={10} className='renter-info container text-center'>
        <Avatar
          style={{}}
          size={{
            xs: 150,
            sm: 150,
            md: 150,
            lg: 150,
            xl: 200,
            xxl: 200,
          }}
          icon={<img src={user.avatar} alt='avatar' />}
        />
        <Space
          size={80}
          direction={isMobile ? 'vertical' : 'horizontal'}
          style={{ marginTop: 25, marginBottom: 25 }}
        >
          <Descriptions layout='vertical' bordered>
            <Descriptions.Item label='Họ và tên' span={2}>
              {user.name}
            </Descriptions.Item>
            <Descriptions.Item label='Email' span={3}>
              {user.emailAddress}
            </Descriptions.Item>
            <Descriptions.Item label='Số điện thoại' span={2}>
              {user.phone}
            </Descriptions.Item>
            <Descriptions.Item label='Thời gian tạo tài khoản'>
              {user.creationTime}
            </Descriptions.Item>
          </Descriptions>
        </Space>
        <Button
          className='mt-3'
          onClick={() => {
            setEdit(true);
          }}
          style={{ borderRadius: 20 }}
        >
          Chỉnh sửa thông tin
        </Button>
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
                      <img
                        src={avatar}
                        alt='avatar'
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
              </Form.Item>
              <Form.Item
                name='username'
                label='Tên người dùng'
                required={true}
                initialValue={user.userName}
              >
                <Input disabled />
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
      </Col>
      <Col span={14}>
        <Card className='my-list container'>
          <Divider>Danh sách các phòng trọ yêu thích</Divider>
          <List
            grid={{
              column: 3,
            }}
            className='my-list-grid'
            dataSource={listSuggestPost}
            pagination={{
              pageSize: 6,
              total: 10,
              position: 'bottom',
            }}
            renderItem={(item) => (
              <List.Item>
                <Card
                  className='my-post'
                  cover={
                    <img
                      alt='example'
                      src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                    />
                  }
                  hoverable
                  // actions={[
                  //   <Tooltip title="20 Lượt thích" color="#F95559">
                  //     <LikeOutlined key="like" />
                  //   </Tooltip>,
                  //   <Tooltip title="30 bình luận" color="blue">
                  //     <CommentOutlined key="cmt" />
                  //   </Tooltip>,
                  //   <Tooltip
                  //     title="Đánh giá"
                  //     color="#F76B6E"
                  //   >
                  //     <StarOutlined key='add-to-my-list'/>
                  //   </Tooltip>,
                  // ]}
                  onClick={() => {}}
                >
                  <Meta title={item.title} description={item.content} />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};
