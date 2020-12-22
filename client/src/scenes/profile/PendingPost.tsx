import { DatePicker, Modal, Table, Button } from 'antd';
import history from '../../services/history';
import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deletePost, getPendingPost } from '../../services/post';

export const PendingPost: React.FC = () => {
  const [pendingPost, setPendingPost] = useState([]);
  // const [fromDate, setFromDate] = useState<any>();
  // const [toDate, setToDate] = useState<any>();

  const onSearch = (value: any) => {
    getPendingPost(setPendingPost, {
      title: value,
      // dateFrom: Date(fromDate).toISOString(),
      // dateTo: Date.parse(toDate).toLocaleString(),
    });
  };

  useEffect(() => {
    getPendingPost(setPendingPost);
  }, []);

  const columns = [
    {
      title: 'Tiêu đề bài viết',
      dataIndex: 'title',
      key: 'title',
      render: (text: any) => <>{text}</>,
    },
    {
      title: 'Diện tích',
      dataIndex: 'roomArea',
      key: 'roomArea',
      render: (text: any) => <>{text} m&sup2;</>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
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
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'action',
      render: (id: any, record: any) => (
        <>
          <EditTwoTone onClick={() => {}} />
          <DeleteOutlined
            style={{ marginLeft: 30, color: 'red' }}
            onClick={() => confirmDelete(id)}
          />
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
          getPendingPost(setPendingPost);
        });
      },
    });
  };
  return (
    <div className='approving-post'>
      <div className='row container'>
        <div className='col-8'>
          <Search
            style={{ marginBottom: 20 }}
            placeholder='Tìm kiếm'
            allowClear
            enterButton='Tìm'
            size='large'
            onSearch={onSearch}
          />
          <div className='sort-date row'>
            <p className='title col-2'>Ngày tạo</p>
            <DatePicker
              placeholder='Từ ngày'
              style={{ marginLeft: 20 }}
              className='col-3'
              // onChange={(date) => setToDate(date)}
            />
            <DatePicker
              placeholder='Đến ngày'
              style={{ marginLeft: 20 }}
              // onChange={(date) => setFromDate(date)}
              className='col-3'
            />
          </div>
        </div>
        <div className='create-post col-4'>
          <Button type='primary' onClick={() => history.push('/post')}>
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
        dataSource={pendingPost}
        pagination={{ position: ['bottomCenter'], pageSize: 6 }}
      ></Table>
    </div>
  );
};
