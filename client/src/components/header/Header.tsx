/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Row, Col, Menu, Button, Popover } from 'antd';
import Icon from '@ant-design/icons';
import { enquireScreen } from 'enquire-js';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { getCurrentUser, getUser, logout } from '../../utils/auth';

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
    modalAbout: false,
    isLogin: false,
    profile: null,
  };

  componentDidMount() {
    enquireScreen((b: any) => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
    this.setState({ isLogin: localStorage.getItem('accessToken') !== null });
    this.setState({ profile: getUser() });
    if (localStorage.getItem('accessToken') !== null)
      getCurrentUser().then(() => this.setState({ profile: getUser() }));
  }

  closeModal() {
    let modalAbout = false;
    this.setState({ modalAbout });
  }

  render() {
    const { menuMode, menuVisible, isLogin, profile } = this.state;

    const menu = (
      <Menu mode={menuMode as any} id='nav' key='nav'>
        <Menu.Item key='home'>
          <Link to='/'>Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key='accommod'>
          <Link to='/accommod'>
            <span>Tìm trọ</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='post'>
          <Link to='/post'>
            <span>Đăng bài</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='search'>
          <Link to='/search'>
            <span>Tìm kiếm</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          {isLogin ? (
            <div>
              {
                <img
                  // src={(profile as any).imageUrl}
                  src='https://vnu.edu.vn/upload/2014/11/17202/image/Logo-VNU-1995.jpg'
                  alt='avatar'
                  height={25}
                  style={{ borderRadius: 20, marginRight: 20 }}
                />
              }
              <Link to='/profile/user-info'>
                <b className='mr-3'>{(profile as any).name}</b>
              </Link>
              <Button
                onClick={logout}
                className='button'
                style={{ borderRadius: 32 }}
              >
                <span className='buttonText'>Đăng xuất</span>
              </Button>
            </div>
          ) : (
            <Button
              className='buttonText'
              onClick={() => {
                window.location.href = '/login';
              }}
              style={{ borderRadius: 32 }}
            >
              Đăng nhập
            </Button>
          )}
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <div id='header' className='header container'>
          {menuMode === 'inline' ? (
            <Popover
              overlayClassName='popover-menu'
              placement='bottomRight'
              content={menu}
              trigger='click'
              visible={menuVisible}
              arrowPointAtCenter
            >
              <Icon
                className='nav-phone-icon'
                type='menu'
                onClick={() => {
                  this.setState({ menuVisible: !menuVisible });
                }}
              />
            </Popover>
          ) : null}
          <Row>
            <Col xxl={6} xl={6} lg={8} md={8} sm={24} xs={24}>
              <Link to='/'>
                <div id='logo'>
                  <img src={logo} alt='logo' />
                  <b>EASY ACCOMMODATION</b>
                </div>
              </Link>
            </Col>
            <Col xxl={18} xl={18} lg={16} md={16} sm={0} xs={0}>
              <div className='header-meta'>
                <div id='preview'></div>
                {menuMode === 'horizontal' ? <div id='menu'>{menu}</div> : null}
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Header;
