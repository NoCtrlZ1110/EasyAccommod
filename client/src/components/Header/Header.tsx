/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Row, Col, Menu, Button, Popover, Modal } from 'antd';
import Icon from '@ant-design/icons';
import { enquireScreen } from 'enquire-js';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import GoogleLogoutBtn from '../GoogleLogin/GoogleLogoutButton';

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
    this.setState({ profile: JSON.parse(localStorage.getItem('loginData')!) });
    console.log(localStorage.getItem('loginData'));
  }

  closeModal() {
    let modalAbout = false;
    this.setState({ modalAbout });
  }

  render() {
    const { menuMode, menuVisible, isLogin, profile } = this.state;

    const menu = (
      <Menu mode={menuMode as any} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="main">
          <Link to="/accommod">
            <span>Accommod List</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="menu2">
          <Link to="/menu2">
            <span>Menu2</span>
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <div id="header" className="header">
          {menuMode === 'inline' ? (
            <Popover
              overlayClassName="popover-menu"
              placement="bottomRight"
              content={menu}
              trigger="click"
              visible={menuVisible}
              arrowPointAtCenter
            >
              <Icon className="nav-phone-icon" type="menu" />
            </Popover>
          ) : null}
          <Row>
            <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
              <Link to="/">
                <div id="logo">
                  <img src={logo} alt="logo" />
                  <b>EASY ACCOMMODATION</b>
                </div>
              </Link>
            </Col>
            <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
              <div className="header-meta">
                <div id="preview">
                  {isLogin ? (
                    <>
                      {
                        <img
                          src={(profile as any).imageUrl}
                          alt="logo"
                          height={25}
                          style={{ borderRadius: 20, marginRight: 20 }}
                        />
                      }
                      <b className="mr-3">{(profile as any).givenName}</b>
                      <GoogleLogoutBtn />
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        window.location.href = '/login';
                      }}
                    >
                      Login
                    </Button>
                  )}
                </div>
                {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title={<div className="text-center">About this project 😎</div>}
          centered
          visible={this.state.modalAbout}
          onOk={() => this.closeModal()}
          onCancel={() => this.closeModal()}
          footer={[
            <div className="text-center">
              <Button
                key="submit"
                type="dashed"
                onClick={() => this.closeModal()}
              >
                🥰🥰🥰
              </Button>
            </div>,
          ]}
        >
          <div className="text-center">
            <p>❤ Bài tập lớn môn "Phát triển ứng dụng Web" ❤</p>
            <p>Năm học 2020-2021</p>
          </div>
        </Modal>
      </>
    );
  }
}

export default Header;
