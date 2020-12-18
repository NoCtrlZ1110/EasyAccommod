import {
  Breadcrumb,
  Card,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Radio,
  Button,
} from 'antd';
import React from 'react';
import SVG from 'react-inlinesvg';
import { UploadImage } from './UploadImage';
import { useMediaQuery } from 'react-responsive';
const { Option } = Select;

export const CreatePost: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

  return (
    <div className='create-post container'>
      <Divider />
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href='/'>Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Đăng bài</Breadcrumb.Item>
      </Breadcrumb>
      <Divider style={{ marginBottom: 100 }} />
      <Form onValuesChange={() => {}}>
        <Row justify='center'>
          <Space direction='horizontal' size={200}>
            {!isMobile && <SVG src={'svgs/map.svg'} height={250} />}
            <Card
              title='Thông tin cơ bản'
              style={{
                width: 500,
                backgroundColor: '#f075a5',
                borderRadius: 10,
              }}
            >
              <Form onValuesChange={() => {}}>
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
                <Form.Item label='Xã/ phường'>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder='Chọn xã/ phường'
                  >
                    <Option value='jack'>Mỹ Đình II</Option>
                    <Option value='tom'>Khác</Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Đường'>
                  <Input placeholder='Nhập tên đường phố' />
                </Form.Item>
              </Form>
            </Card>
          </Space>
        </Row>

        {/* --------------- */}
        <Divider style={{ marginTop: 50, marginBottom: 50 }} />
        {/* --------------- */}

        <Row justify='center'>
          <Space direction='horizontal' size={200}>
            <Card
              title='Thông tin mô tả'
              style={{
                width: 500,
                backgroundColor: '#f589b3',
                borderRadius: 10,
              }}
            >
              <Form.Item label='Tiêu đề'>
                <Input placeholder='Nhập tiêu đề bài viết' />
              </Form.Item>
              <Form.Item label='Loại phòng'>
                <Select showSearch placeholder='Chọn loại phòng' allowClear>
                  <Option value='phongtro'>Phòng trọ</Option>
                  <Option value='ccmini'>Chung cư mini</Option>
                  <Option value='nhanguyencan'>Nhà nguyên căn</Option>
                  <Option value='ccnguyencan'>Chung cư nguyên căn</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Chung chủ'>
                <Select showSearch allowClear placeholder='Chọn loại chung chủ'>
                  <Option value='chungchu'>Chung chủ</Option>
                  <Option value='khongchungchu'>Không chung chủ</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Giá cả'>
                <Input placeholder='Nhập giá tiền (tính theo tháng)' />
              </Form.Item>
              <Form.Item label='Diện tích'>
                <Input placeholder='Nhập diện tích (mét vuông)' />
              </Form.Item>
              <Divider
                className='mb-4'
                orientation='left'
                children='Điều kiện cơ sở vật chất'
              />
              <Form.Item label='Phòng bếp'>
                <Select showSearch allowClear placeholder='Chọn loại chung chủ'>
                  <Option value='beprieng'>Khu bếp riêng</Option>
                  <Option value='bepchung'>Khu bếp chung</Option>
                  <Option value='khongnauan'>Không nấu ăn</Option>
                </Select>
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
                <Form.Item
                  name='giadien'
                  rules={[{ required: true }]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    marginBottom: 10,
                  }}
                >
                  <Input placeholder='Giá số điện (kW/h)' />
                </Form.Item>
                <Form.Item
                  className='ml-3'
                  name='gianuoc'
                  rules={[{ required: true }]}
                  style={{
                    display: 'inline-block',
                    width: 'calc(50% - 8px)',
                    marginBottom: 10,
                  }}
                >
                  <Input placeholder='Giá số nước (m3)' />
                </Form.Item>
              </Form.Item>
              <Form.Item label='Tiện ích khác'>
                <Input placeholder='tủ lạnh/ máy giặt/giường tủ/...' />
              </Form.Item>
            </Card>
            {!isMobile && <SVG src={'svgs/seo.svg'} height={250} />}
          </Space>
        </Row>
        {/* --------------- */}
        <Divider />
        {/* --------------- */}
        <Row justify='center'>
          <Card
            title='Thông tin hình ảnh'
            style={{
              maxWidth: '85%',
              backgroundColor: '#eb94b6',
              borderRadius: 10,
            }}
          >
            <Space>
              <Card>
                * Upload ít nhất 3 ảnh cho bài đăng để đạt hiệu quả tốt hơn Tin
                đăng có hình ảnh thường hiệu quả hơn 59% tin đăng không có hình
                ảnh.
              </Card>
              <UploadImage />
            </Space>
          </Card>
        </Row>
        {/* --------------- */}
        <Divider style={{ marginTop: 80, marginBottom: 200 }}>
          <>
            <Button
              size='large'
              style={{ backgroundColor: '#f075a5', color: 'white' }}
            >
              Đăng Bài
            </Button>
          </>
        </Divider>
      </Form>
    </div>
  );
};
