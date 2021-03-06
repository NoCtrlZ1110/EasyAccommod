/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Row, Col, Menu, Button, Popover } from 'antd';
import Icon from '@ant-design/icons';
import { enquireScreen } from 'enquire-js';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { getCurrentUser, getUser, logout } from '../../services/auth';

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
    modalAbout: false,
    isLogin: false,
    isOwner: false,
    profile: null,
  };

  componentDidMount() {
    enquireScreen((b: any) => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
    this.setState({ isLogin: localStorage.getItem('accessToken') !== null });
    this.setState({ profile: getUser() });

    if (localStorage.getItem('accessToken') !== null) {
      getCurrentUser().then(() => this.setState({ profile: getUser() }));
      this.setState({ isOwner: getUser().roleNames[0] === 'OWNER' });
    }
  }

  closeModal() {
    let modalAbout = false;
    this.setState({ modalAbout });
  }

  render() {
    const { menuMode, menuVisible, isLogin, profile } = this.state;

    const menu = (
      <Menu mode={menuMode as any} id='nav' key='nav'>
        {isLogin && (
          <>
            <Menu.Item key='home'>
              <Link to='/home'>Trang chủ</Link>
            </Menu.Item>
            {!this.state.isOwner && (
              <Menu.Item key='search'>
                <Link to='/search'>
                  <span>Tìm trọ</span>
                </Link>
              </Menu.Item>
            )}
            {this.state.isOwner && (
              <>
                <Menu.Item key='post'>
                  <Link to='/post/create'>
                    <span>Đăng bài</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key='pending-post'>
                  <Link to='/profile/pending-post'>
                    <span>Bài viết</span>
                  </Link>
                </Menu.Item>
              </>
            )}
          </>
        )}
        {/* <Menu.Item key='search'>
          <Link to='/search'>
            <span>Tìm kiếm</span>
          </Link>
        </Menu.Item> */}

        {isLogin ? (
          <>
            <Menu.Item>
              <Link to='/profile'>
                <img
                  // src={(profile as any).imageUrl}
                  src='https://upload.wikimedia.org/wikipedia/commons/c/ca/VNU.logo.jpg'
                  alt='avatar'
                  height={25}
                  style={{ borderRadius: 20, marginRight: 20 }}
                />

                <Link to='/profile'>
                  <b className='mr-3'>{(profile as any).name}</b>
                </Link>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Button
                onClick={logout}
                className='button'
                style={{ borderRadius: 32 }}
              >
                <span className='buttonText'>Đăng xuất</span>
              </Button>
            </Menu.Item>
          </>
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
