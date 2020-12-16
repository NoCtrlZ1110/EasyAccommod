import React from 'react';
import { Row, Button } from 'antd';

function Footer() {
  return (
    <footer id="footer" className="dark">
      <div className="container">
        <Row className="bottom-bar">
          <a href="https://github.com/NoCtrlZ1110/EasyAccommod">
            <Button ghost size="small">
              Mã nguồn
            </Button>
          </a>
          <div className="ml-auto">
            <span
              style={{
                lineHeight: '16px',
                paddingRight: 12,
                marginRight: 11,
                borderRight: '1px solid rgba(255, 255, 255, 0.55)',
              }}
            >
              <a
                href="https://itest.com.vn/lects/webappdev/mockproj/EasyAccomod.htm"
                rel="noopener noreferrer"
                target="_blank"
              >
                Đề bài
              </a>
            </span>
            <span style={{ marginRight: 24 }}>
              <a
                href="https://itest.com.vn/lects/webappdev/mockproj/EasyAccomod.htm"
                rel="noopener noreferrer"
                target="_blank"
              >
                2020F-INT3306
              </a>
            </span>
            <span>Copyright © 2020</span>
          </div>
        </Row>
      </div>
    </footer>
  );
}

export default Footer;
