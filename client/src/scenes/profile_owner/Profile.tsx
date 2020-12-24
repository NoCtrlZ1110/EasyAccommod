import React, { useState } from 'react';
import { Card, Layout, Menu } from 'antd';
import history from '../../services/history';
import { UserOutlined, KeyOutlined, BarChartOutlined } from '@ant-design/icons';
import ProfileRouter from './ProfileRouter';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../services/auth';

const { Sider } = Layout;
const { SubMenu } = Menu;
const Profile = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (_collapsed: any) => {
    setCollapsed(_collapsed);
  };

  const location = useLocation();

  const isOwner = getUser().roleNames[0] === 'OWNER';

  return (
    <Layout style={{ minHeight: '88.4vh' }}>
      <Sider
        theme='light'
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div className='avt'></div>
        <Menu
          theme='light'
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={['sub']}
          mode='inline'
        >
          <Menu.Item
            key='/profile/user-info'
            icon={<UserOutlined />}
            onClick={() => history.push('/profile/user-info')}
          >
            Thông tin cá nhân
          </Menu.Item>

          {isOwner && (
            <SubMenu
              key='sub'
              icon={<BarChartOutlined />}
              title='Thống kê bài đăng'
            >
              <Menu.Item
                key='/profile/pending-post'
                onClick={() => history.push('/profile/pending-post')}
              >
                Đang chờ duyệt
              </Menu.Item>
              <Menu.Item
                key='/profile/active-post'
                onClick={() => history.push('/profile/active-post')}
              >
                Đang hoạt động
              </Menu.Item>
              <Menu.Item
                key='/profile/expired-post'
                onClick={() => history.push('/profile/expired-post')}
              >
                Đã hết hạn
              </Menu.Item>
            </SubMenu>
          )}
          <Menu.Item
            key='/change-password'
            icon={<KeyOutlined />}
            onClick={() => history.push('/change-password')}
          >
            Đổi mật khẩu
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout mt-4'>
        <Card className='ml-4 mr-4' style={{ minHeight: '83vh' }}>
          <ProfileRouter />
        </Card>
      </Layout>
    </Layout>
  );
};

export default Profile;
