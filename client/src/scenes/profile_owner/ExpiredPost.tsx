import { DatePicker, Modal, Row, Table, Tag, Tooltip } from "antd";
import React from "react";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeTwoTone,
  PlusSquareTwoTone,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

export const ExpiredPost: React.FC = () => {
  const columns = [
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
    },
    {
      title: 'Lượt thích',
      dataIndex: 'like',
      key: 'like',
    },
    {
      title: 'Ngày tạo bài',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tình trạng',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = 'geekblue';
            if (tag === 'Đã cho thuê') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Xem chi tiết" color="#1890ff">
            <EyeTwoTone />
          </Tooltip>
          <Tooltip title="Xóa bài viết" color="red  ">
            <DeleteOutlined
              style={{ marginLeft: 30, color: "red" }}
              onClick={confirmDelete}
            />
          </Tooltip>
          <Tooltip title="Gia hạn bài đăng" color="#48E692">
            <PlusSquareTwoTone
              twoToneColor="#48E692"
              style={{ marginLeft: 30 }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Phòng trọ giá dân',
      date: '10/10/2020',
      address: 'Xuân Đỉnh, Cầu Giấy',
      tags: ['Chưa cho thuê'],
      view: '100',
      like: '50',
    },
    {
      key: '2',
      name: 'Phòng trọ giá dân',
      date: '10/10/2020',
      address: 'Xuân Đỉnh, Cầu Giấy',
      tags: ['Đã cho thuê'],
      view: '100',
      like: '50',
    },
    {
      key: '3',
      name: 'Phòng trọ giá dân',
      date: '10/10/2020',
      address: 'Xuân Đỉnh, Cầu Giấy',
      tags: ['Chưa cho thuê'],
      view: '100',
      like: '50',
    },
    {
      key: '4',
      name: 'Phòng trọ giá dân',
      date: '10/10/2020',
      address: 'Xuân Đỉnh, Cầu Giấy',
      tags: ['Chưa cho thuê'],
      view: '100',
      like: '50',
    },
    {
      key: '5',
      name: 'Phòng trọ giá dân',
      date: '10/10/2020',
      address: 'Xuân Đỉnh, Cầu Giấy',
      tags: ['Đã cho thuê'],
      view: '100',
      like: '50',
    },
  ];
  function confirmDelete() {
    Modal.confirm({
      title: 'Xóa bài viết',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn sẽ xóa bài viết?',
      okText: 'OK',
      cancelText: 'Không',
      onOk: () => {},
    });
  }
  return (
    <div className='expired-post'>
      <Row justify='center' style={{ marginBottom: 20 }} className=''>
        <Search
          style={{ marginBottom: 20 }}
          placeholder='Tìm kiếm'
          allowClear
          enterButton='Tìm'
          size='large'
          className='col-5'
        />
        <div className='col-5'>
          <Row justify='space-around'>
            <p style={{ fontSize: 16 }}>Ngày tạo</p>
            <DatePicker placeholder='Từ ngày' />
            <DatePicker placeholder='Đến ngày' />
          </Row>
        </div>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ position: ['bottomCenter'], pageSize: 5 }}
      ></Table>
    </div>
  );
};
