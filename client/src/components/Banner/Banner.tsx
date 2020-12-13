/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import GitHubButton from 'react-github-button';
import BannerSVGAnim from '../../scenes/Home/BannerSVGAnim';
// import history from "../../services/history";

function Banner(props: any) {
  return (
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/os/s/prod/antv/assets/image/home/intro-landscape-3a409.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim
        className="banner-title-wrapper"
        type={props.isMobile ? 'bottom' : 'right'}
      >
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1">
          EASY 🔎
          <br /> ACCOMMOD
        </h1>
        <p key="content">Hệ thống tìm nhà trọ trực tuyến</p>
        <div key="button" className="button-wrapper">
          <Button
            type="primary"
            onClick={() => (window.location.href = '/login')}
          >
            Get Started
          </Button>

          <a href="https://github.com/NoCtrlZ1110/EasyAccommod/">
            <Button style={{ margin: '0 16px' }} type="primary" ghost>
              Source Code
            </Button>
          </a>
          <GitHubButton
            type="stargazers"
            namespace="NoCtrlZ1110"
            repo="EasyAccommod"
          />
        </div>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
    </div>
  );
}

Banner.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Banner;
