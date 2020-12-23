/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card,
  List,
  Row,
  Image,
  Modal,
  Table,
  Tag,
  DatePicker,
  Divider,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EyeTwoTone,
  ExclamationCircleOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import history from '../../services/history';
import Search from 'antd/lib/input/Search';
import LineChart from '../../components/chart/LineChart';
import { deletePost, getAprrovedPost, markRent } from '../../services/post';
import { Apartment } from '../../models/PostDetailModel';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const ActivePost: React.FC = () => {
  const [approvedPost, setApprovedPost] = useState([]);
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  useEffect(() => {
    getAprrovedPost(setApprovedPost);
  }, []);

  const confirmDelete = (id: any) => {
    Modal.confirm({
      title: 'Xóa bài viết',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn sẽ xóa bài viết?',
      okText: 'OK',
      cancelText: 'Không',
      onOk: () => {
        deletePost(id, () => {
          getAprrovedPost(setApprovedPost);
        });
      },
    });
  };

  const dataView = [21, 22, 10, 28, 16, 21, 13, 33, 55, 35];
  const dataLike = [100, 50, 20, 70, 45, 67, 85, 53, 65, 53];

  const chartHeight = 400;
  const chartWidth = 750;
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

      render: (tags: any) => (
        <>
          <Tag color='blue'>Đã được chấp thuận</Tag>
        </>
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      key: 'action',
      render: (id: any) => (
        <>
          <Tooltip title='Xem chi tiết' color='#51abff'>
            <EyeTwoTone
              onClick={() => {
                history.push('/post/detail/' + id);
              }}
            />
          </Tooltip>
          <Tooltip title='Xóa bài viết' color='red'>
            <DeleteOutlined
              style={{ marginLeft: 30, color: 'red' }}
              onClick={() => confirmDelete(id)}
            />
          </Tooltip>
          <Tooltip
            title='Đánh dấu là đã cho thuê'
            color='#52c41a'
            mouseLeaveDelay={0.1}
          >
            <CheckCircleTwoTone
              twoToneColor='#52c41a'
              style={{ marginLeft: 30, color: 'red' }}
              onClick={() => {
                markRent(id);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const onSearch = (value: string) => {
    if (!(value.length > 0)) {
      getAprrovedPost(setApprovedPost);
    } else {
      getAprrovedPost(setApprovedPost, {
        title: value,
        dateFrom: fromDate,
        dateTo: toDate,
      });
    }
  };
  return (
    <div className='active-post'>
      <Divider>
        <h3>Tất cả các bài viết</h3>
      </Divider>
      <div className='active-post'>
        <div className='ml-auto d-flex'>
          <DatePicker
            placeholder='Từ'
            style={{ marginRight: 20, minWidth: 200 }}
            onChange={(date) => setToDate(moment(date).format('L'))}
          />
          <DatePicker
            placeholder='Đến'
            style={{ marginRight: 20, minWidth: 200 }}
            onChange={(date) => setFromDate(moment(date).format('L'))}
          />

          <Search
            style={{}}
            placeholder='Tìm kiếm'
            allowClear
            enterButton='Tìm'
            size='large'
            onSearch={onSearch}
          />
        </div>
        <Divider />
        <Table
          bordered
          columns={columns}
          dataSource={approvedPost}
          pagination={{ pageSize: 5 }}
        ></Table>
      </div>
      <Row justify='space-around' style={{ margin: 20 }}>
        <Card className='like-view-chart text-center'>
          <div className='chart-title'>10 bài viết nổi bật nhất</div>
          <br />
          <Row justify='center'>
            {LineChart(dataLike, dataView, chartHeight, chartWidth)}
          </Row>
        </Card>
        <Card className='like-new-post'>
          <div className='chart-title'>Nội dung</div>,
          <List
            size='large'
            pagination={{
              pageSize: 4,
              total: 10,
            }}
            dataSource={approvedPost}
            renderItem={(item: Apartment) => (
              <List.Item key={item.title} className='item-title'>
                <List.Item.Meta
                  title={
                    <Link to={'/post/detail/' + item.id}>{item.title}</Link>
                  }
                  description={item.detail}
                />
                <Image
                  className='item-image'
                  src='https://cloud.mogi.vn/images/2020/11/16/273/dc7e966a4770454486dde923ab7311de.jpg'
                ></Image>
              </List.Item>
            )}
          />
        </Card>
      </Row>
      <br />
    </div>
  );
};
