import React from 'react';
import { List, Avatar, Space, Breadcrumb } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const AccommodList = () => {
  const listData = [];
  for (let i = 0; i < 20; i++) {
    listData.push({
      href: '#',
      title: `Homestay cao cấp giá sinh viên khu vực Câu Giấy #${i}`,
      avatar: 'https://avatars1.githubusercontent.com/u/48156618?s=400&v=4',
      description: 'Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội',
      content: `Cần cho thuê phòng trọ homestay ngay tại ngõ 133 Xuân Thuỷ (đối diện chợ Xanh). phòng 2-3 giường tầng. Có phòng Vip. Giường có rèm che riêng tư, bàn học làm việc từng phòng.
       Vị trí trung tâm quận Cầu Giấy, cách Đại học Quốc Gia, Sư Phạm, Thương Mại, Học viện Sân khấu Điện Ảnh, Báo Chí & Tuyên Truyền 5p xe máy.
       Ngõ thông ra Trần Quốc Vượng, Duy Tân, Xuân Thuỷ, Dịch Vọng nên rất tiện di chuyển. Chợ, hàng xá, quán ăn, cửa hàng tạp hoá ngay gần nhà.
       Full tiện nghi, Chỉ việc xách va li đến ở. Giá trọn gói chỉ từ 1tr6-1tr8 (Free điện nước internet). Dọn dẹp vệ sinh sạch sẽ 3 lần/tuần. Giờ giấc tự do, thoải mái, không chung chủ, chỗ để xe rộng rãi free.`,
    });
  }

  const IconText = ({ icon, text }: any) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <div className="container mb-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="#">Accommod</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="#">Accommod List</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 2,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <>
                <div className="my-3">
                  <img width={272} alt="logo" src="https://bit.ly/2VCho0Q" />
                </div>
                <b className="ml-5" style={{ fontSize: 18 }}>
                  12.000.000 VNĐ / tháng
                </b>
              </>
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default AccommodList;
