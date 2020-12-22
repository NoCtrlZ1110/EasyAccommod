import {
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  Button,
} from "antd";
import history from "../../services/history";
import React, { useState } from "react";
import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { UploadImage } from "../create_post/UploadImage";
import { Tabs } from "antd";
import Search from "antd/lib/input/Search";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ApprovingPost: React.FC = () => {
  const [canEdit, setCanEdit] = useState(false);
  const { Option } = Select;
  const { TabPane } = Tabs;
  const onSearch = (value: any) => console.log(value);

  const columns = [
    {
      title: "Tiêu đề bài viết",
      dataIndex: "name",
      key: "name",
      render: (text: any) => <>{text}</>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Giá thuê",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text: any, record: any) => (
        <>
          <EditTwoTone onClick={() => setCanEdit(true)} />
          <DeleteOutlined
            style={{ marginLeft: 30, color: "red" }}
            onClick={confirmDelete}
          />
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Phòng trọ giá rẻ khu vực Cầu Giấy",
      date: "20/10/2020",
      address: "Ngõ 20 Hồ Tùng Mậu",
      price: "2.000.000 VNĐ",
    },
    {
      key: "2",
      name: "Phòng trọ 20m2 chỉ dành cho nữ",
      date: "11/12/2020",
      address: "Home City",
      price: "3.500.000 VNĐ",
    },
    {
      key: "3",
      name: "Phòng trọ giá siêu rẻ giữa Trung tâm TP",
      date: "02/12/2020",
      address: "Đường Trường Chinh",
      price: "Thương lượng",
    },
  ];
  function confirmDelete() {
    Modal.confirm({
      title: "Xóa bài viết",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn sẽ xóa bài viết?",
      okText: "OK",
      cancelText: "Không",
      onOk: () => {},
    });
  }
  return (
    <div className="approving-post">
      <div className="row container">
        <div className="col-8">
          <Search
            style={{ marginBottom: 20 }}
            placeholder="Tìm kiếm"
            allowClear
            enterButton="Tìm"
            size="large"
            onSearch={onSearch}
          />
          <div className="sort-date row">
            <p className="title col-2">Ngày tạo</p>
            <DatePicker
              placeholder="Từ ngày"
              style={{ marginLeft: 20 }}
              className="col-3"
            />
            <DatePicker
              placeholder="Đến ngày"
              style={{ marginLeft: 20 }}
              className="col-3"
            />
          </div>
        </div>
        <div className="create-post col-4">
          <Button type="primary" onClick={() => history.push("/post")}>
            <span style={{ marginRight: 10, fontWeight: 500, fontSize: 15 }}>
              Tạo vài viết mới
            </span>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"], pageSize: 6 }}
      ></Table>
      <Modal
        width={700}
        style={{ top: 20 }}
        visible={canEdit}
        onOk={() => setCanEdit(false)}
        onCancel={() => {
          setCanEdit(false);
        }}
        destroyOnClose
        cancelText="Hủy"
        okText="Gửi yêu cầu"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span>Thông tin cơ bản</span>} key="1">
            <div
              className="container"
              style={{
                alignItems: "center",
                width: 500,
                borderRadius: 10,
              }}
            >
              <Form onValuesChange={() => {}}>
                <Form.Item label="Tỉnh/ thành phố">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
                    placeholder="Chọn quận/huyện"
                  >
                    <Option value="CG">Cầu Giấy</Option>
                    <Option value="NTL">Nam Từ Liêm</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Địa chỉ cụ thể">
                  <Input placeholder="Nhập tên xã/phường, đường phố..." />
                </Form.Item>
              </Form>
            </div>
          </TabPane>
          <TabPane tab={<span>Thông tin mô tả</span>} key="2">
            <div
              className="container"
              style={{
                width: 500,
                borderRadius: 10,
              }}
            >
              <Form.Item label="Tiêu đề">
                <Input placeholder="Nhập tiêu đề bài viết" />
              </Form.Item>
              <Form.Item label="Loại phòng">
                <Select showSearch placeholder="Chọn loại phòng" allowClear>
                  <Option value="phongtro">Phòng trọ</Option>
                  <Option value="ccmini">Chung cư mini</Option>
                  <Option value="nhanguyencan">Nhà nguyên căn</Option>
                  <Option value="ccnguyencan">Chung cư nguyên căn</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Chung chủ">
                <Select showSearch allowClear placeholder="Chọn loại chung chủ">
                  <Option value="chungchu">Chung chủ</Option>
                  <Option value="khongchungchu">Không chung chủ</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Giá cả">
                <Input placeholder="Nhập giá tiền (tính theo tháng)" />
              </Form.Item>
              <Form.Item label="Diện tích">
                <Input placeholder="Nhập diện tích (mét vuông)" />
              </Form.Item>
              <Form.Item label="Phòng bếp">
                <Select showSearch allowClear placeholder="Chọn loại chung chủ">
                  <Option value="beprieng">Khu bếp riêng</Option>
                  <Option value="bepchung">Khu bếp chung</Option>
                  <Option value="khongnauan">Không nấu ăn</Option>
                </Select>
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
                <Form.Item
                  name="giadien"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginBottom: 10,
                  }}
                >
                  <Input placeholder="Giá số điện (kW/h)" />
                </Form.Item>
                <Form.Item
                  className="ml-3"
                  name="gianuoc"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginBottom: 10,
                  }}
                >
                  <Input placeholder="Giá số nước (m3)" />
                </Form.Item>
              </Form.Item>
              <Form.Item label="Tiện ích khác">
                <Input placeholder="tủ lạnh/ máy giặt/giường tủ/..." />
              </Form.Item>
            </div>
          </TabPane>
          <TabPane tab={<span>Thay đổi ảnh của bài viết</span>} key="3">
            <div className="conatainer">
              <Space>
                <Card>
                  * Upload ít nhất 3 ảnh cho bài đăng để đạt hiệu quả tốt hơn
                  Tin đăng có hình ảnh thường hiệu quả hơn 59% tin đăng không có
                  hình ảnh.
                </Card>
                <UploadImage />
              </Space>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};
