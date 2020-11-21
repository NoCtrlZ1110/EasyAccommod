import React from "react";
import { Row, Col, Button } from "antd";

function Footer() {
  return (
    <footer
      id="footer"
      className="dark"
      style={{ position: "absolute", bottom: 0, width: "100%" }}
    >
      <Row className="bottom-bar">
        <Col lg={6} sm={24}>
          <div className="translate-button">
            <a href="https://github.com/NoCtrlZ1110/EasyAccommod">
              <Button ghost size="small">
                Mã nguồn
              </Button>
            </a>
          </div>
        </Col>
        <Col lg={18} sm={24}>
          <span
            style={{
              lineHeight: "16px",
              paddingRight: 12,
              marginRight: 11,
              borderRight: "1px solid rgba(255, 255, 255, 0.55)",
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
          <span style={{ marginRight: 12 }}>Copyright © NoCtrlZ</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
