import React, { useState } from 'react';
import {
  List,
  Avatar,
  Space,
  Row,
  Card,
  Form,
  Select,
  Input,
  Modal,
  Divider,
  Radio,
  Button,
  Image,
} from 'antd';
import { StarOutlined, LikeOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Search from 'antd/lib/input/Search';
import { useMediaQuery } from 'react-responsive';

const { Option } = Select;
const AccommodList = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
  const [visible, setVisible] = useState(false);
  const listData = [];
  const listTitle = [
    'Homestay cao cấp giá sinh viên khu vực Cầu Giấy',
    'Phòng trọ cho sinh viên giá rẻ',
    'Nhà trọ khu vực Cầu Giấy',
    'Homestay cao cấp giá sinh viên',
    'Phòng trọ cho sinh viên khu vực Công Nghiệp',
    'Nhà trọ giữa trung tâm thành phố',
    'Phòng trọ phù hợp hộ gia đình',
    'Nhà trọ khu vực Cầu Giấy',
  ];
  const listPlace = [
    'Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    'Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    'Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    'Mai Dịch, Cầu Giấy',
    'Mai Dịch, Cầu Giấy',
    'Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    'Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
    'Mai Dịch, Cầu Giấy',
  ];
  const listPrice = [
    '12.000.000',
    '12.000.000',
    '12.000.000',
    '12.000.000',
    '12.000.000',
    '12.000.000',
    '12.000.000',
    '12.000.000',
  ];
  const listArea = ['20', '30', '10', '70', '20', '30', '10', '70'];
  const listId = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const listRate = ['4.5', '4.9', '4.5', '4.9', '4.5', '4.9', '4.5', '4.9'];
  const listProvince = [
    'Hà Nội',
    'Hải Dương',
    'Bắc Giang',
    'Hồ Chí Minh',
    'Thái Bình',
    'Nam Định',
  ];
  const listContact = [
    '0399142818',
    '0385241652',
    '0399142818',
    '0385241652',
    '0399142818',
    '0385241652',
    '0399142818',
    '0385241652',
  ];
  for (let i = 0; i < listTitle.length; i++) {
    listData.push({
      key: listId[i],
      price: listPrice[i],
      href: '/profile/user-info',
      title: listTitle[i],
      avatar: 'https://avatars1.githubusercontent.com/u/48156618?s=400&v=4',
      description: listPlace[i],
      content: `Cần cho thuê phòng trọ homestay ngay tại ngõ 133 Xuân Thuỷ (đối diện chợ Xanh). phòng 2-3 giường tầng. Có phòng Vip. Giường có rèm che riêng tư.`,
      area: listArea[i],
      rate: listRate[i],
      contact: listContact[i],
    });
  }

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <Row className='container show-results' justify='space-between'>
      <div className='list-post'>
        <List
          itemLayout='vertical'
          size='large'
          pagination={{
            pageSize: 3,
            total: listData.length,
          }}
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={HomeOutlined}
                  text={`${item.area}m2`}
                  key='list-vertical-star-o'
                />,
                <IconText
                  icon={LikeOutlined}
                  text='156'
                  key='list-vertical-like-o'
                />,
                <IconText
                  icon={StarOutlined}
                  text={`${item.rate}`}
                  key='list-vertical-message'
                />,
              ]}
              extra={
                <>
                  <div className='my-3'>
                    <img width={272} alt='logo' src='https://bit.ly/2VCho0Q' />
                  </div>
                  <b
                    className='ml-5'
                    style={{ fontSize: 18, color: '#ef7733' }}
                  >
                    {item.price} VNĐ/tháng
                  </b>
                </>
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={
                  <Link className='post-title' to={item.href}>
                    {item.title}
                  </Link>
                }
                description={item.description}
              />
              {item.content}
              <div className='contact-info'>
                Liên hệ: {item.contact.substring(0, item.contact.length - 3)}
                ***
              </div>
              <br />
            </List.Item>
          )}
        />
      </div>
      <div className='search-right'>
        <Search
          style={{ marginBottom: 20 }}
          placeholder='Tìm kiếm'
          allowClear
          enterButton='Tìm'
          size='large'
        />
        <Card className='room-place' title='Tìm nhanh theo địa chỉ' draggable>
          <Form>
            <Form.Item label='Tỉnh/ thành phố'>
              <Select showSearch placeholder='Chọn tỉnh/ thành phố'>
                {listProvince.map((item) => (
                  <Option value={`${item}`}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Tìm ngay
              </Button>
            </Form.Item>
          </Form>
          <div
            onClick={() => setVisible(true)}
            style={{
              cursor: 'pointer',
              textAlign: 'left',
              color: '#3384ef',
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'underline',
            }}
          >
            Bộ lọc nâng cao
          </div>
          <Modal
            title='Bộ lọc'
            centered
            visible={visible}
            okText='Tìm'
            cancelText='Huỷ'
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            style={{ minWidth: !isMobile ? 1000 : 'unset' }}
          >
            <Form onValuesChange={() => {}}>
              <Space direction={isMobile ? 'vertical' : 'horizontal'}>
                <Card>
                  <Form.Item label='Tỉnh/ thành phố'>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder='Chọn tỉnh/ thành phố'
                    >
                      <Option value='HN'>Hà Nội</Option>
                      <Option value='HCM'>TP. HCM</Option>
                      <Option value='other'>Khác</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label='Quận/ huyện'>
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder='Chọn quận/huyện'
                    >
                      <Option value='CG'>Cầu Giấy</Option>
                      <Option value='NTL'>Nam Từ Liêm</Option>
                      <Option value='other'>Khác</Option>
                    </Select>
                  </Form.Item>
                  <Divider />
                  <Form.Item label='Giá cả '>
                    <Form.Item
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 12px)',
                      }}
                    >
                      <Input placeholder='Từ (triệu/tháng)' />
                    </Form.Item>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '24px',
                        lineHeight: '32px',
                        textAlign: 'center',
                      }}
                    >
                      -
                    </span>
                    <Form.Item
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 12px)',
                      }}
                    >
                      <Input placeholder='tới' />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label='Diện tích'>
                    <Form.Item
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 12px)',
                      }}
                    >
                      <Input placeholder='Từ (mét vuông)' />
                    </Form.Item>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '24px',
                        lineHeight: '32px',
                        textAlign: 'center',
                      }}
                    >
                      -
                    </span>
                    <Form.Item
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 12px)',
                      }}
                    >
                      <Input placeholder='tới' />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label='Điện nước'>
                    <Select
                      className='mb-3'
                      showSearch
                      allowClear
                      placeholder='Loại điện nước'
                    >
                      <Option value='giadan'>Giá dân</Option>
                      <Option value='giathue'>Giá thuê</Option>
                    </Select>
                  </Form.Item>
                </Card>
                <Card>
                  <Form.Item label='Chung chủ'>
                    <Radio.Group>
                      <Radio value='khongchungchu'>Không chung chủ</Radio>
                      <Radio value='tamchung'>Chung chủ</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label='Phòng tắm'>
                    <Radio.Group>
                      <Radio value='tamchung'>Chung</Radio>
                      <Radio value='tamkhepkin'>Khép kín</Radio>
                    </Radio.Group>
                    <Radio.Group className='mt-4 mb-1'>
                      <Radio value='tamchung'>Có nóng lạnh</Radio>
                      <Radio value='tamkhepkin'>Không nóng lạnh</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.Item label='Điều hoà'>
                    <Radio.Group>
                      <Radio value='true'>Có</Radio>
                      <Radio value='false'>Không</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label='Ban công'>
                    <Radio.Group>
                      <Radio value='true'>Có</Radio>
                      <Radio value='false'>Không</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Card>
              </Space>
            </Form>
          </Modal>
        </Card>
        <br />
        <br />
        <Image className='banner' src='banner.png'></Image>
      </div>
    </Row>
  );
};

export default AccommodList;
