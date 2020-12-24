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
import {
  LikeOutlined,
  ExclamationCircleOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useParams } from 'react-router-dom';
import { PostComment } from '../../components/comment/comment';
import { BASE_URL } from '../../config';
import { Apartment } from '../../models/PostDetailModel';
import {
  addPostToFavorite,
  getPostDetail,
  likePost,
  ratePost,
} from '../../services/post';
import { toast } from 'react-toastify';

export const PostDetail: React.FC = () => {
  const { id } = useParams<any>();
  const [likes, setLikes] = useState(0);
  const [rate, setRate] = useState<any>();
  const [liked, setLiked] = useState(false);
  const [loadingReport, setLoadingReport] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
  const responsive = useMediaQuery({ query: '(max-width: 1199px)' });
  const [postDetail, setPostDetail] = useState<Apartment>();

  const like = () => {
    likePost(id, () => {
      setLiked(!liked);
      getPostDetail(id, setPostDetail);
    });
  };

  const average = (arr: any) => {
    if (!arr) return;
    let sum = 0;
    arr.forEach((e: any) => {
      sum += e.rate;
    });
    return sum / arr.length;
  };

  const report = () => {
    setLoadingReport(true);
    setTimeout(() => {
      setLoadingReport(false);
      toast.warn('⛔ Đã báo cáo bài viết thành công ');
    }, 2000);
  };
  const favorite = () => {
    setLoadingFavorite(true);
    addPostToFavorite(id, () => {
      setLoadingFavorite(false);
    });
  };

  useEffect(() => {
    setRate(average(postDetail?.apartmentRates));
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
        <h3>
          {postDetail?.title}
          {postDetail?.isEmpty && (
            <Tag color='red' style={{ fontSize: 16, marginLeft: 20 }}>
              Đã cho thuê
            </Tag>
          )}
          {postDetail?.isApprove !== 1 && (
            <Tag color='#2db7f5' style={{ marginLeft: 20 }}>
              <span style={{ fontSize: 16 }}>
                {postDetail?.isApprove === 0
                  ? 'Chưa được duyệt'
                  : postDetail?.isApprove === 2
                  ? 'Đã bị từ chối'
                  : ''}
              </span>
            </Tag>
          )}
        </h3>
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

            <Tag color='blue'>
              <span style={{ fontSize: 16 }}>{postDetail?.ownerPhone} </span>
            </Tag>
            <div className='d-flex'>
              <Button disabled={liked} type='primary' onClick={like}>
                <LikeOutlined />
                Thích: {likes}
              </Button>
              <Button
                loading={loadingReport}
                type='primary'
                danger
                className='ml-2'
                onClick={report}
              >
                <ExclamationCircleOutlined />
                Báo cáo
              </Button>
            </div>
            <div className='d-flex'>
              <Button
                loading={loadingFavorite}
                type='primary'
                danger
                onClick={favorite}
              >
                <HeartTwoTone twoToneColor='#eb2f96' />
                Thêm vào yêu thích
              </Button>
            </div>
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
      <p className='container'>{postDetail?.detail}</p>
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
        <Descriptions.Item label='Thời gian hiển thị tin'>
          {postDetail?.timeShown.name}
        </Descriptions.Item>
        <Descriptions.Item label='Ngày hết hạn tin'>
          {postDetail?.expirationDate}
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
