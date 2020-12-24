import * as React from 'react';
import { Layout } from 'antd';
import './index.less';
const Footer = () => {
  
  return (
    <Layout.Footer className={'footer'} style={{ textAlign: 'center' }}>
      Hệ thống quản lý tìm trọ - EASY © 2020s <a href="https://github.com/NoCtrlZ1110/EasyAccommod">Github Page</a>
    </Layout.Footer>
  );
};
export default Footer;
