import { Card, Row, Tooltip, List, Divider, Avatar, Space, Col } from 'antd';
import React, { useEffect, useState } from 'react';

import { SearchBar } from '../../components/search_bar/SearchBar';
import { LikeOutlined, CommentOutlined, PlusOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { searchPost } from '../../services/post';
import { Apartment } from '../../models/PostDetailModel';
import { Link } from 'react-router-dom';
import { StarOutlined, HomeOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

export const HomeUser: React.FC = () => {
  const [posts, setPosts] = useState([]);

  const responsive = useMediaQuery({ query: '(max-width: 900px)' });

  useEffect(() => {
    searchPost({}, setPosts, true);
  }, []);

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

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className='home-user container'>
      <div className='home-user-search row text-center'>
        <div className='col'>
          <SearchBar></SearchBar>
        </div>
      </div>
      <Row justify='space-between' className='home-body'>
        <Col>
          <Card style={{ minWidth: responsive ? 400 : 750 }}>
            <Divider orientation='left'>Các bài viết nổi bật</Divider>
            <List
              itemLayout='vertical'
              size='large'
              pagination={{
                pageSize: 3,
                total: posts.length,
              }}
              dataSource={posts}
              renderItem={(item: Apartment, index) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText
                      icon={HomeOutlined}
                      text={<>{item.roomArea} m&sup2;</>}
                      key='list-vertical-star-o'
                    />,
                    <IconText
                      icon={LikeOutlined}
                      text={item.like}
                      key='list-vertical-like-o'
                    />,
                    <IconText
                      icon={StarOutlined}
                      text={4.7}
                      key='list-vertical-message'
                    />,
                  ]}
                  extra={
                    <>
                      <div className='my-3'>
                        <img
                          width={272}
                          height={150}
                          alt='logo'
                          src={
                            index === 1
                              ? 'https://cloud.mogi.vn/images/2020/11/09/368/2f98c1ec352f419db14344b46415b315.jpg'
                              : index === 2
                              ? 'https://bit.ly/2VCho0Q'
                              : 'https://cloud.mogi.vn/images/2020/12/17/000/d2c2141b299449d9909bd71d32c914f6.jpg'
                          }
                          style={{ borderRadius: 10 }}
                        />
                      </div>
                      <b
                        className='ml-5'
                        style={{ fontSize: 18, color: '#cf2d49' }}
                      >
                        {item.roomPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' '}
                        VNĐ / tháng
                      </b>
                    </>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={
                          'https://upload.wikimedia.org/wikipedia/commons/c/ca/VNU.logo.jpg'
                        }
                      />
                    }
                    title={
                      <Link to={'/post/detail/' + item.id}>{item.title}</Link>
                    }
                    description={
                      <span className=''>
                        {item.district.name + ' - ' + item.province.name}
                      </span>
                    }
                  />
                  {item.detail}
                  <div className='contact-info'>Liên hệ: {item.ownerPhone}</div>
                  <br />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        {!responsive && (
          <Card className='suggest-post'>
            <Divider
              style={{ fontSize: 18, fontWeight: 500, cursor: 'pointer' }}
            >
              <div onClick={() => {}}>Các bài viết tương tự</div>
            </Divider>
            <List
              dataSource={listSuggestPost}
              pagination={{
                pageSize: 2,
                total: 10,
                position: 'bottom',
              }}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    className='suggest-post-card'
                    cover={
                      <img
                        alt='example'
                        src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                      />
                    }
                    hoverable
                    actions={[
                      <Tooltip title='20 Lượt thích' color='#F95559'>
                        <LikeOutlined key='like' />
                      </Tooltip>,
                      <Tooltip title='30 bình luận' color='blue'>
                        <CommentOutlined key='cmt' />
                      </Tooltip>,
                      <Tooltip
                        title='Thêm vào danh sách yêu thích'
                        color='#F76B6E'
                      >
                        <PlusOutlined key='add-to-my-list' />
                      </Tooltip>,
                    ]}
                    onClick={() => {}}
                  >
                    <Meta title={item.title} description={item.content} />
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        )}
      </Row>
    </div>
  );
};
