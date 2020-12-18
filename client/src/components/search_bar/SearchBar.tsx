import Search from 'antd/lib/input/Search';
import React, { useState } from 'react';
import { ReactComponent as Filter } from '../../assets/svgs/filter.svg';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
} from 'antd';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchBar: React.FC = () => {
  const height = 55;
  const [visible, setVisible] = useState(false);
  const { Option } = Select;
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });

  return (
    <div className="search-bar mx-3">
      <Search
        height={height}
        addonBefore={
          <Button
            className="filter-btn"
            icon={<Filter fill="#508f55" height={30} width={30} />}
            style={{
              height: height,
              width: height,
              border: '3px solid #508f55;',
            }}
            onClick={() => setVisible(true)}
          ></Button>
        }
        placeholder="nhập thông tin tìm kiếm "
        allowClear
        enterButton={
          <Button
            style={{
              height: height,
              backgroundColor: '#508f55',
              color: 'white',
            }}
          >
            <span style={{ fontSize: 18, marginRight: 10 }}>Tìm kiếm</span>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Button>
        }
        onSearch={() => {}}
      ></Search>
      <Modal
        title="Bộ lọc"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        style={{ minWidth: !isMobile ? 1000 : 'unset' }}
      >
        <Form onValuesChange={() => {}}>
          <Space direction={isMobile ? 'vertical' : 'horizontal'}>
            <Card>
              <Form.Item label="Tỉnh/ thành phố">
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn tỉnh/ thành phố"
                >
                  <Option value="HN">Hà Nội</Option>
                  <Option value="HCM">TP. HCM</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Quận/ huyện">
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn quận/huyện"
                >
                  <Option value="CG">Cầu Giấy</Option>
                  <Option value="NTL">Nam Từ Liêm</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>
              <Divider />
              <Form.Item label="Giá cả ">
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                  <Input placeholder="Từ (triệu/tháng)" />
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
                  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                  <Input placeholder="tới" />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Diện tích">
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                  <Input placeholder="Từ (mét vuông)" />
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
                  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                >
                  <Input placeholder="tới" />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Điện nước">
                <Select
                  className="mb-3"
                  showSearch
                  allowClear
                  placeholder="Loại điện nước"
                >
                  <Option value="giadan">Giá dân</Option>
                  <Option value="giathue">Giá thuê</Option>
                </Select>
              </Form.Item>
            </Card>
            <Card>
              <Form.Item label="Chung chủ">
                <Radio.Group>
                  <Radio value="khongchungchu">Không chung chủ</Radio>
                  <Radio value="tamchung">Chung chủ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Phòng tắm">
                <Radio.Group>
                  <Radio value="tamchung">Chung</Radio>
                  <Radio value="tamkhepkin">Khép kín</Radio>
                </Radio.Group>
                <Radio.Group className="mt-4 mb-1">
                  <Radio value="tamchung">Có nóng lạnh</Radio>
                  <Radio value="tamkhepkin">Không nóng lạnh</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Điều hoà">
                <Radio.Group>
                  <Radio value="true">Có</Radio>
                  <Radio value="false">Không</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Ban công">
                <Radio.Group>
                  <Radio value="true">Có</Radio>
                  <Radio value="false">Không</Radio>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};
