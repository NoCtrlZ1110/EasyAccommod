import { Card, Row } from "antd";
import React from "react";
import Chart from "../../components/chart/Chart";

export const ActivePost: React.FC = () => {
  const dataView = [21, 22, 10, 28, 16, 21, 13, 33, 55, 35];
  const dataLike = [100, 50, 20, 70, 45, 67, 85, 53, 65, 53];
  const chartHeight = 400;
  const chartWidth = 750;
  return (
    <div className="active-post">
      <Row justify="space-around" style={{ margin: 20 }}>
        <Card className="like-view-chart text-center">
          <div className="chart-title">
            10 bài viết có lượng like và view cao nhất
          </div>
          <br />
          <Row justify="center">
          {Chart(dataLike, dataView, chartHeight, chartWidth)}
          </Row>
        </Card>
        <Card className="like-new-post">
          <div className="chart-title">
            Nội dung
          </div>
        </Card>
      </Row>
      <Row justify="center">
        <Card></Card>
      </Row>
    </div>
  );
};
