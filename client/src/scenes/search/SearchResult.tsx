import { Avatar, Breadcrumb, Divider, List, Space, Image, Row } from 'antd';
import { StarOutlined, LikeOutlined, HomeOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../../components/search_bar/SearchBar';
import { searchPost } from '../../services/post';
import { Apartment } from '../../models/PostDetailModel';

export const SearchResult = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let Title = params.get('Title');
  let ProvinceId = params.get('ProvinceId')
    ? parseInt(params.get('ProvinceId')!)
    : params.get('ProvinceId');
  let DistrictId = params.get('DistrictId')
    ? parseInt(params.get('DistrictId')!)
    : params.get('DistrictId');
  let ApartmentTypeId = params.get('ApartmentTypeId')
    ? parseInt(params.get('ApartmentTypeId')!)
    : params.get('ApartmentTypeId');
  let PriceFrom = params.get('PriceFrom')
    ? parseInt(params.get('PriceFrom')!)
    : params.get('PriceFrom');
  let AreaFrom = params.get('AreaFrom')
    ? parseInt(params.get('AreaFrom')!)
    : params.get('AreaFrom');
  let AreaTo = params.get('AreaTo')
    ? parseInt(params.get('AreaTo')!)
    : params.get('AreaTo');
  let StayWithOwner = params.get('StayWithOwner');

  const [result, setResult] = useState([]);

  const average = (arr: any) => {
    if (!arr) return;
    let sum = 0;
    arr.forEach((e: any) => {
      sum += e.rate;
    });
    return sum / arr.length;
  };

  useEffect(() => {
    searchPost(
      {
        Title,
        ProvinceId,
        DistrictId,
        ApartmentTypeId,
        StayWithOwner,
        PriceFrom,
        AreaFrom,
        AreaTo,
      },
      setResult
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className='search-result container'>
      <Divider />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/search'>Tìm kiếm</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Kết quả tìm kiếm</Breadcrumb.Item>
      </Breadcrumb>
      <Divider />
      {SearchBar({
        Title,
        ProvinceId,
        DistrictId,
        ApartmentTypeId,
        StayWithOwner,
        PriceFrom,
        AreaFrom,
        AreaTo,
      })}
      <Divider />
      <Row>
        <div className='list-post'>
          <List
            itemLayout='vertical'
            size='large'
            pagination={{
              pageSize: 3,
              total: result.length,
            }}
            dataSource={result}
            renderItem={(item: Apartment) => (
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
                    text={`${average(item.apartmentRates)}`}
                    key='list-vertical-message'
                  />,
                ]}
                extra={
                  <>
                    <div className='my-3'>
                      <img
                        width={272}
                        alt='logo'
                        src='https://bit.ly/2VCho0Q'
                      />
                    </div>
                    <b
                      className='ml-5'
                      style={{ fontSize: 18, color: '#ef7733' }}
                    >
                      {item.roomPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      VNĐ/tháng
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
                    <Link className='post-title' to={'/post/detail/' + item.id}>
                      {item.title}
                    </Link>
                  }
                  description={
                    item.address +
                    ' - ' +
                    item.district.name +
                    ' - ' +
                    item.province.name
                  }
                />
                {item.detail}
                <div className='contact-info'>Liên hệ: {item.ownerPhone}</div>
                <br />
              </List.Item>
            )}
          />
        </div>
        <div className='search-right ml-auto'>
          <Image className='banner' src='/banner.png'></Image>
          <Image className='banner' src='/banner.png'></Image>
        </div>
      </Row>
      <Divider />
    </div>
  );
};
