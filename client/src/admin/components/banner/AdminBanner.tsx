/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import {Col, Row} from 'antd';
import BannerSVGAnim from '../../../scenes/home/BannerSVGAnim';

// import history from "../../services/history";

function Banner(props: any) {
    return (
        <div>
            <Row gutter={[48, 48]}>
                <Col  span={24}>
                    <TweenOne animation={{opacity: 1}} className=''>
                        <BannerSVGAnim/>
                    </TweenOne>
                </Col>
                <Col span={24}>
                    <QueueAnim
                        className=''
                        type={'bottom'}
                    >
                        <div key='line' className=''>
                            <div
                                className=''
                                style={{transform: 'translateX(-64px)'}}
                            />
                        </div>
                        <h1 key='h1'>
                            EASY 🔎
                            <br/> ACCOMMOD MANAGEMENT
                        </h1>
                        <p key='content'>Hệ thống tìm nhà trọ trực tuyến</p>
                    </QueueAnim>
                </Col>
            </Row>
        </div>
    );
}

Banner.propTypes = {
    isMobile: PropTypes.bool.isRequired,
};

export default Banner;
