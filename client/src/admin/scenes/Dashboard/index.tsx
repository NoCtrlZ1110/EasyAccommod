import * as React from 'react';
import { Row, Col, Card } from 'antd';
import {CheckOutlined, QuestionOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import './index.less';
import TinyLineChartExample from './components/TinyLineChartExample';
import BarChartExample from './components/BarChartExample';
import PieChartExample from './components/PieChartExample';
import LineChartExample from './components/LineChartExample';
import ListExample from './components/ListExample';

export class Dashboard extends React.Component<any> {
  componentDidMount() {
    setTimeout(() => this.setState({ cardLoading: false }), 1000);
    setTimeout(() => this.setState({ lineChartLoading: false }), 1500);
    setTimeout(() => this.setState({ barChartLoading: false }), 2000);
    setTimeout(() => this.setState({ pieChartLoading: false }), 1000);
  }

  state = {
    cardLoading: true,
    lineChartLoading: true,
    barChartLoading: true,
    pieChartLoading: true,
  };

  render() {
    const { cardLoading, lineChartLoading, barChartLoading, pieChartLoading } = this.state;

    const visitorStatisticList = [
      { title: 'Hôm nay', body: '1 user' },
      { title: 'Hôm qua', body: '2 user' },
      { title: 'Tuần trước', body: '6 user' },
    ];

    return (
      <React.Fragment>
        <Row gutter={16}>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <Card className={'dasboardCard-task'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <CheckOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Tổng số bài đăng</p>
                <label className={'dashboardCardCounter'}>22</label>
              </Col>
            </Card>
          </Col>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <Card className={'dasboardCard-ticket'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <QuestionOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Bài đăng mới</p>
                <label className={'dashboardCardCounter'}>10</label>
              </Col>
            </Card>
          </Col>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <Card className={'dasboardCard-comment'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <UserOutlined  className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Tổng số tài khoản</p>
                <label className={'dashboardCardCounter'}>12</label>
              </Col>
            </Card>
          </Col>
          <Col
            className={'dashboardCard'}
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 11 }}
            lg={{ offset: 1, span: 11 }}
            xl={{ offset: 0, span: 6 }}
            xxl={{ offset: 0, span: 6 }}
          >
            <Card className={'dasboardCard-visitor'} bodyStyle={{ padding: 10 }} loading={cardLoading} bordered={false}>
              <Col span={8}>
                <UserAddOutlined className={'dashboardCardIcon'} />
              </Col>
              <Col span={16}>
                <p className={'dashboardCardName'}>Tài khoản mới</p>
                <label className={'dashboardCardCounter'}>4</label>
              </Col>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Card className={'dashboardBox'} title="Visit Statistics" loading={lineChartLoading} bordered={false}>
              <LineChartExample />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 22 }}
            lg={{ offset: 0, span: 8 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 8 }}
          >
            <Card className={'dashboardCardTinyLine'} loading={barChartLoading} bordered={false}>
              <TinyLineChartExample />
              <ListExample value={visitorStatisticList} />
            </Card>
          </Col>
          <Col
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 22 }}
            lg={{ offset: 0, span: 8 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 8 }}
          >
            <Card className={'latestSocialTrendsList'} loading={barChartLoading} bordered={false}>
              <TinyLineChartExample />
              <ListExample value={visitorStatisticList} />
            </Card>
          </Col>
          <Col
            xs={{ offset: 1, span: 22 }}
            sm={{ offset: 1, span: 22 }}
            md={{ offset: 1, span: 22 }}
            lg={{ offset: 0, span: 8 }}
            xl={{ offset: 0, span: 8 }}
            xxl={{ offset: 0, span: 8 }}
          >
            <Card className={'answeredTickeds'} loading={barChartLoading} bordered={false}>
              <TinyLineChartExample />
              <ListExample value={visitorStatisticList} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={16}>
            <Card title="Payment Statistics" className={'dashboardBox'} loading={barChartLoading} bordered={false}>
              <BarChartExample />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Browser Usage" className={'dashboardBox'} loading={pieChartLoading} bordered={false}>
              <PieChartExample />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Dashboard;
