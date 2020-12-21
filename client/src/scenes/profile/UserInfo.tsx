import React from "react";
import {
  Form,
  Input,
  Radio,
  Cascader,
  DatePicker,
  Button,
} from 'antd';
export const UserInfo = () => {
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        className="user-info"
      >
        <h3>Chỉnh sửa thông tin cá nhân</h3>
        <br />
        <Form.Item label="Avatar">
          <div className="user-avt">
            <img src="https://pbs.twimg.com/media/EiHnf16XYAIR-7D.jpg" alt="test" />
          </div>
        </Form.Item>
        <Form.Item label="Họ và tên" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Số CMND/CCCD" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" required={true}>
          <Input />
        </Form.Item>
        <Form.Item label="Ngày tháng năm sinh" required={true}>
          <DatePicker placeholder="Chọn ngày" />
        </Form.Item>
        <Form.Item label="Giới tính" required={true}>
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Chọn địa điểm" required={true}>
          <Cascader
            showSearch
            placeholder="Chọn tỉnh/thành phố"
            options={[
              {
                value: 'hcm',
                label: 'Hồ Chí Minh',
                children: [
                  {
                    value: 'quan1',
                    label: 'Quận 1',
                  },
                  {
                    value: 'quan2',
                    label: 'Quận 2',
                  },
                ],
              },
              {
                value: 'hn',
                label: 'Hà Nội',
                children: [
                  {
                    value: 'caugiay',
                    label: 'Quận Cầu Giấy',
                  },
                ],
              },
              {
                value: 'hd',
                label: 'Hải Dương',
                children: [
                  {
                    value: 'tanky',
                    label: 'Huyện Tân Kỳ',
                  },
                ],
              },
              {
                value: 'bg',
                label: 'Bắc Giang',
                children: [
                  {
                    value: 'hh',
                    label: 'Huyện Hiệp Hòa',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ cụ thể" required={true}>
          <Input placeholder="Chọn xã/phường, đường, số nhà ..."/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Gửi yêu cầu
        </Button>
        </Form.Item>
      </Form>
    </>
  );
}