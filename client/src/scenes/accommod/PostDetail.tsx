import {
  Avatar,
  Breadcrumb,
  Card,
  Carousel,
  Row,
  Descriptions,
  Divider,
  Space,
  Tag,
  Button,
  Rate,
} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { PostComment } from '../../components/comment/comment';
import { BASE_URL } from '../../config';
import { Apartment } from '../../models/PostDetailModel';
import { getPostDetail, ratePost } from '../../services/post';

export const PostDetail: React.FC = () => {
  const { id } = useParams<any>();
  const [likes, setLikes] = useState(0);
  const [rate, setRate] = useState<any>();
  const [liked, setLiked] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const responsive = useMediaQuery({ query: '(max-width: 1199px)' });
  const [postDetail, setPostDetail] = useState<Apartment>();

  const like = () => {
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  };

  const avarage = (arr: any) => {
    if (!arr) return;
    let sum = 0;
    arr.forEach((e: any) => {
      sum += e.rate;
    });
    return sum / arr.length;
  };

  useEffect(() => {
    setRate(avarage(postDetail?.apartmentRates));
    setLikes(postDetail?.like ? postDetail?.like : 0);
  }, [postDetail]);

  useEffect(() => {
    getPostDetail(id, setPostDetail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className='post-detail'>
      <Divider />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/post'>Bài đăng</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      <Row>
        <h3>{postDetail?.title}</h3>
        <code className='ml-auto mr-5' style={{ fontSize: isMobile ? 20 : 25 }}>
          {postDetail?.roomPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ / tháng'}
        </code>
      </Row>
      <Divider />
      <Row justify='center'>
        <Carousel
          autoplay
          style={{
            height: isMobile ? 300 : 400,
            width: isMobile ? 450 : 600,
          }}
        >
          {postDetail?.apartmentImages.map((img) => (
            <img
              className='apartment_preview'
              src={BASE_URL + img.imageUrl}
              alt='apartment_preview'
            ></img>
          ))}
        </Carousel>
        <Card className='owner-card ' style={{}}>
          <Space
            align='baseline'
            size='middle'
            direction={responsive ? 'horizontal' : 'vertical'}
          >
            <Avatar
              size={isMobile ? 60 : 100}
              icon={
                <img
                  alt='avatar'
                  src='https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg'
                />
              }
            />
            <h4>{postDetail?.ownerName}</h4>
            {postDetail?.isApprove !== 1 && !isMobile && (
              <Tag color='#2db7f5'>
                <span style={{ fontSize: 16 }}>
                  {postDetail?.isApprove === 0
                    ? 'Chưa được duyệt'
                    : postDetail?.isApprove === 2
                    ? 'Đã bị từ chối'
                    : ''}
                </span>
              </Tag>
            )}
            <Tag color='blue'>
              <span style={{ fontSize: 16 }}>{postDetail?.ownerPhone} </span>
            </Tag>
            <Button onClick={like}>
              <LikeOutlined />
              Likes: {likes}
            </Button>
            <Rate
              value={rate}
              onChange={(value: any) => {
                setRate(value);
                ratePost(value, id, () => {
                  getPostDetail(id, setPostDetail);
                });
              }}
            />
            <span>{postDetail?.apartmentRates.length} đánh giá</span>
          </Space>
        </Card>
      </Row>
      <Divider />
      <Descriptions className='details' layout='vertical' bordered>
        <Descriptions.Item label='Tỉnh thành / thành phố'>
          {postDetail?.province.name}
        </Descriptions.Item>
        <Descriptions.Item label='Quận / huyện'>
          {postDetail?.district.name}
        </Descriptions.Item>
        <Descriptions.Item label='Địa chỉ cụ thể'>
          {postDetail?.address}
        </Descriptions.Item>
        <Descriptions.Item label='Loại nhà'>
          {postDetail?.apartmentType?.name}
        </Descriptions.Item>
        <Descriptions.Item label='Số lượng phòng'>
          {postDetail?.numberRoom}
        </Descriptions.Item>
        <Descriptions.Item label='Diện tích'>
          {postDetail?.roomArea} m&sup2;
        </Descriptions.Item>
        <Descriptions.Item label='Giá phòng (triệu/tháng)'>
          {postDetail?.roomPrice
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ'}
        </Descriptions.Item>
        <Descriptions.Item label='Chung chủ'>
          {postDetail?.liveWithTheOwner ? 'Chung chủ' : 'Không chung chủ'}
        </Descriptions.Item>
        <Descriptions.Item label='Điều hoà'>
          {postDetail?.airConditional ? 'Có điều hoà' : 'Không có điều hoà'}
        </Descriptions.Item>
        <Descriptions.Item label='Ban công'>
          {postDetail?.balcony ? 'Có ban công' : 'Không có ban công'}
        </Descriptions.Item>
        <Descriptions.Item label='Loại giá điện'>
          {postDetail?.electricityPriceType ? 'Giá dân' : 'Giá thuê'}
        </Descriptions.Item>
        <Descriptions.Item label='Giá số điện (kw/H)'>
          {postDetail?.electricityPrice}
        </Descriptions.Item>
        <Descriptions.Item label='Loại giá nước'>
          {postDetail?.waterPriceType ? 'Giá dân' : 'Giá thuê'}
        </Descriptions.Item>
        <Descriptions.Item label='Giá số nước (m&#179;)'>
          {postDetail?.waterPrice}
        </Descriptions.Item>
        <Descriptions.Item label='Loại phòng tắm'>
          {postDetail?.bathroomType.name +
            ' - ' +
            postDetail?.bathroomType.description}
        </Descriptions.Item>
        <Descriptions.Item label='Loại nhà bếp'>
          {postDetail?.kitchenType.name +
            ' - ' +
            postDetail?.kitchenType.description}
        </Descriptions.Item>
        <Descriptions.Item label='Loại nhà bếp'>
          {postDetail?.kitchenType.name +
            ' - ' +
            postDetail?.kitchenType.description}
        </Descriptions.Item>
        <Descriptions.Item label='Tiện ích khác'>
          {postDetail?.otherUtility}
        </Descriptions.Item>
      </Descriptions>

      <Divider className='mt-5' orientation='left'>
        Bình luận
      </Divider>
      {PostComment(id)}
      <Divider />
    </div>
  );
};
