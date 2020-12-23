import {
  Card,
  Carousel,
  Row,
  Image,
  Tooltip,
  List,
  Badge,
  Divider,
} from "antd";
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { SearchBar } from "../../components/search_bar/SearchBar";
import { LikeOutlined, CommentOutlined, PlusOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";

export const  HomeUser: React.FC = () => {
  const imagePostList = [
    "https://cdn.thongtinduan.com/uploads/posts/2019-07/1562040097_nhung-kien-thuc-co-ban-can-biet-truoc-khi-ki-hop-dong-thue-nha-tro2.jpg",
    "https://vnn-imgs-f.vgcloud.vn/2018/12/13/15/nha-tro.jpg",
    "https://cdn.thongtinduan.com/uploads/posts/2019-07/1562040097_nhung-kien-thuc-co-ban-can-biet-truoc-khi-ki-hop-dong-thue-nha-tro2.jpg",
  ];
  const carousel = useRef<any>();
  const next = () => (carousel.current as any).next();
  const prev = () => (carousel.current as any).prev();
  const mostViewPostTitle = "Phòng trọ khép kín tại Xuân Thủy, Cầu Giấy";
  const mostViewPostContent =
    "Cần cho thuê phòng trọ homestay ngay tại ngõ 133 Xuân Thủy (đối diện) chợ Xanh. Phòng 2-3 giường tầng. Có phòng vip. Phòng rộng rãi, phù hợp cho hộ gia đình. Sinh viên đi làm thêm, balbab blab abla bla abla";
  const listSuggestPost = [];
  const listSuggestPostTitle = [
    "Phòng trọ giá rẻ",
    "Phòng cho nữ",
    "Phòng cho nữ",
    "Phòng trọ giá rẻ",
    "Phòng cho nữ",
    "Phòng trọ giá rẻ",
    "Phòng trọ giá rẻ",
    "Phòng trọ giá rẻ",
    "Phòng trọ giá rẻ",
    "Phòng cho nữ",
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
  ]
  for (let i = 0; i < 10; i++) {
    listSuggestPost.push({
      href: "",
      title: listPriceSuggestPost[i],
      content: listSuggestPostTitle[i]
    });
  }
  return (
    <div className="home-user container">
      <div className="home-user-search row text-center">
        <div className="search-title col-3">Tìm kiếm tại đây</div>
        <div className="col-9">
          <SearchBar></SearchBar>
        </div>
      </div>
      <Row justify="space-between" className="home-body">
        <>
          <Row justify="start" className="slide-card">
            <div className="prev-icon" onClick={prev}>
              <FontAwesomeIcon
                className="prev-FontAwesomeIcon"
                icon={faChevronLeft}
                size="2x"
                color="white"
              />
            </div>
            <div className="slide-image">
              <Carousel draggable ref={carousel} dotPosition="bottom">
                {imagePostList.map((image) => (
                  <div className="">
                    <Badge.Ribbon text="Được xem nhiều nhất" color="red">
                      <Image className="image-post" src={image} />
                    </Badge.Ribbon>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="next-icon" onClick={next}>
              <FontAwesomeIcon
                className="next-FontAwesomeIcon"
                icon={faChevronRight}
                size="2x"
                color="white"
              />
            </div>
            <p className="post-title">{mostViewPostTitle}</p>
            <p className="post-content">
              {mostViewPostContent}
              <div
                style={{
                  textDecoration: "underline",
                  fontStyle: "italic",
                  marginLeft: 10,
                  fontFamily: "Quicksand",
                  color: "#3A6CF9",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Xem chi tiết
              </div>
            </p>
          </Row>
          <br />
        </>
        <Card className="suggest-post">
          <Divider style={{ fontSize: 18, fontWeight: 500, cursor: "pointer" }}>
            <div onClick={() => {}}>
            Các bài viết tương tự
            </div>
          </Divider>
          <List
            dataSource={listSuggestPost}
            pagination={{
              pageSize: 2,
              total: 10,
              position: "bottom",
            }}
            renderItem={(item) => (
              <List.Item>
                <Card
                  className="suggest-post-card"
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  hoverable
                  actions={[
                    <Tooltip title="20 Lượt thích" color="#F95559">
                      <LikeOutlined key="like" />
                    </Tooltip>,
                    <Tooltip title="30 bình luận" color="blue">
                      <CommentOutlined key="cmt" />
                    </Tooltip>,
                    <Tooltip
                      title="Thêm vào danh sách yêu thích"
                      color="#F76B6E"
                    >
                      <PlusOutlined key="add-to-my-list" />
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
      </Row>
    </div>
  );
};
