import { Badge, Breadcrumb, Col, Descriptions, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Apartment } from '../../models/PostDetailModel';
import { getPostDetail } from '../../services/post';

export const PostDetail: React.FC = () => {
  const { id } = useParams<any>();

  const [postDetail, setPostDetail] = useState<Apartment>();

  useEffect(() => {
    getPostDetail(id, setPostDetail);
  }, [id]);

  return (
    <div className='apartment-info'>
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
      <Col>
        <Descriptions title={postDetail?.title} layout='vertical' bordered>
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
            {postDetail?.apartmentType.name}
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
      </Col>
    </div>
  );
};
