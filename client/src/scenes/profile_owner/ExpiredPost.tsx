import { DatePicker, Modal, Row, Table, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeTwoTone,
  PlusSquareTwoTone,
} from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { deletePost, getExpiredPost } from '../../services/post';
import { toast } from 'react-toastify';

export const ExpiredPost: React.FC = () => {
  const [expiredPost, setExpiredPost] = useState([]);

  const extendRequest = () => {
    setTimeout(() => {
      toast.success('Gửi yêu cầu gia hạn bài viết thành công!');
    }, 2000);
  };

  useEffect(() => {
    getExpiredPost(setExpiredPost);
  }, []);

  const columns = [
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Lượt xem',
      dataIndex: 'view',
      key: 'view',
      render: (view: any) => {
        return view ? view : 0;
      },
    },
    {
      title: 'Lượt thích',
      dataIndex: 'like',
      key: 'like',
      render: (like: any) => {
        return like ? like : 0;
      },
    },
    {
      title: 'Diện tích',
      dataIndex: 'roomArea',
      key: 'roomArea',
      render: (text: any) => <>{text} m&sup2;</>,
    },
    {
      title: 'Giá thuê',
      dataIndex: 'roomPrice',
      key: 'roomPrice',
      render: (text: any) => (
        <>{text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</>
      ),
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
          <Tag color='red'>Đã hết hạn</Tag>
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text: any, record: any) => (
        <>
          <Tooltip title='Xem chi tiết' color='#1890ff'>
            <EyeTwoTone />
          </Tooltip>
          <Tooltip title='Xóa bài viết' color='red  '>
            <DeleteOutlined
              style={{ marginLeft: 30, color: 'red' }}
              onClick={confirmDelete}
            />
          </Tooltip>
          <Tooltip title='Gia hạn bài đăng' color='#48E692'>
            <PlusSquareTwoTone
              twoToneColor='#48E692'
              style={{ marginLeft: 30 }}
              onClick={() => {
                extendRequest();
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const confirmDelete = (id: any) => {
    Modal.confirm({
      title: 'Xóa bài viết',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn sẽ xóa bài viết?',
      okText: 'OK',
      cancelText: 'Không',
      onOk: () => {
        deletePost(id, () => {
          getExpiredPost(setExpiredPost);
        });
      },
    });
  };

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
        dataSource={expiredPost}
        bordered
        pagination={{ position: ['bottomCenter'], pageSize: 5 }}
      ></Table>
    </div>
  );
};
