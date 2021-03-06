import {
  Breadcrumb,
  Card,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Radio,
  Button,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import SVG from 'react-inlinesvg';
import { UploadImage } from './UploadImage';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import {
  getDistricts,
  getListApartmentTypes,
  getListBathRoomTypes,
  getListKitchenTypes,
  getListPublicPlaceTypes,
  getProvinces,
  getListTimeShown,
  submitPost,
} from '../../services/post';
import { getUser } from '../../services/auth';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;

export const CreatePost: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1080px)' });
  const [fileList, setFileList] = useState<any>([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [apartmentTypes, setApartmentTypes] = useState([]);
  const [bathRoomTypes, setBathRoomTypes] = useState([]);
  const [kitchenTypes, setKitchenTypes] = useState([]);
  const [timeShown, setTimeShown] = useState([]);
  const [publicPlaceTypes, setPublicPlaceTypes] = useState([]);
  const [currentProvince, setCurrentProvinces] = useState<number>();
  const formRef = useRef(null);

  const user = getUser();

  const onFinish = (values: any) => {
    if (fileList.length < 3) {
      toast.warn('⚠ Vui lòng upload ít nhất 3 ảnh!');
      return;
    }

    const publicPlace = {
      publicPlaceTypeId: values.publicPlaceTypeId,
      detail: values.publicDetail,
    };
    delete values.publicDetail;
    delete values.publicPlaceTypeId;
    values.like = 0;
    values.view = 0;
    let data = {
      apartment: values,
      apartmentImages: fileList.map((img: any) => ({
        imageUrl: img.response.result[0].imageUrl,
      })),

      apartmentPublicPlaces: [publicPlace],
    };
    submitPost(data);
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.warn('⚠ Vui lòng nhập đầy đủ các trường');
  };

  useEffect(() => {
    getProvinces(setProvinces);
    getListApartmentTypes(setApartmentTypes);
    getListBathRoomTypes(setBathRoomTypes);
    getListKitchenTypes(setKitchenTypes);
    getListPublicPlaceTypes(setPublicPlaceTypes);
    getListTimeShown(setTimeShown);
  }, []);

  useEffect(() => {
    if (currentProvince) getDistricts(currentProvince as number, setDistricts);
    (formRef as any).current.setFieldsValue({ districtId: null });
  }, [currentProvince]);

  return (
    <div className='create-post container'>
      <Divider />
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href='/'>Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Đăng bài</Breadcrumb.Item>
      </Breadcrumb>
      <Divider style={{ marginBottom: 100 }} />
      <Form
        ref={formRef}
        onValuesChange={() => {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row justify='center'>
          <Space direction='horizontal' size={200}>
            {!isMobile && <SVG src={'/svgs/map.svg'} height={250} />}
            <Card
              title='Thông tin cơ bản'
              style={{
                width: 500,
                backgroundColor: '#3b88bf',
                borderRadius: 10,
              }}
            >
              {' '}
              <Form.Item
                name='provinceId'
                label='Tỉnh/ thành phố'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn tỉnh/ thành phố',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  placeholder='Chọn tỉnh/ thành phố'
                  onChange={(value: any) => {
                    setCurrentProvinces(value);
                  }}
                >
                  {provinces.map((province: any) => (
                    <Option key={province.id} value={province.id}>
                      {province.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='districtId'
                label='Quận/ huyện'
                rules={[
                  { required: true, message: 'Vui lòng chọn quận/ huyện' },
                ]}
              >
                <Select
                  onSelect={(value) => {}}
                  style={{ width: '100%' }}
                  placeholder='Chọn quận/huyện'
                >
                  {districts.map((district: any) => (
                    <Option key={district.id} value={district.id}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='address'
                label='Địa chỉ cụ thể'
                rules={[
                  { required: true, message: 'Vui lòng nhập địa chỉ cụ thể' },
                ]}
              >
                <Input placeholder='Nhập tên đường/ thôn, xã/ phường' />
              </Form.Item>
              <Form.Item
                label='Tên chủ hộ'
                name='ownerName'
                rules={[
                  { required: true, message: 'Vui lòng nhập tên chủ hộ' },
                ]}
                initialValue={user.surname + ' ' + user.name}
              >
                <Input placeholder='Tên chủ hộ' />
              </Form.Item>
              <Form.Item
                label='SĐT chủ hộ'
                name='ownerPhone'
                initialValue={user.phone}
                rules={[
                  { required: true, message: 'Vui lòng nhập SĐT chủ hộ' },
                ]}
              >
                <Input placeholder='SĐT chủ hộ' />
              </Form.Item>
              <Form.Item
                name='apartmentPublicPlaces'
                label='Địa điểm công cộng'
              >
                <Form.Item
                  name='publicPlaceTypeId'
                  rules={[
                    { required: true, message: 'Vui lòng chọn loại địa điểm' },
                  ]}
                >
                  <Select
                    onSelect={(value) => {}}
                    style={{ width: '100%' }}
                    placeholder='Chọn loại địa điểm'
                  >
                    {publicPlaceTypes.map((publicPlace: any) => (
                      <Option key={publicPlace.id} value={publicPlace.id}>
                        {publicPlace.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name='publicDetail'
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ cụ thể' },
                  ]}
                >
                  <Input placeholder='Tên địa điểm' />
                </Form.Item>
              </Form.Item>
            </Card>
          </Space>
        </Row>

        {/* --------------- */}
        <Divider style={{ marginTop: 50, marginBottom: 50 }} />
        {/* --------------- */}

        <Row justify='center'>
          <Space direction='horizontal' size={200}>
            <Card
              title='Thông tin mô tả'
              style={{
                width: 500,
                backgroundColor: '#33b889',
                borderRadius: 10,
              }}
            >
              <Form.Item
                label='Tiêu đề'
                name='title'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tiêu đề bài viết',
                  },
                ]}
              >
                <Input placeholder='Nhập tiêu đề bài viết' />
              </Form.Item>
              <Form.Item
                name='apartmentTypeId'
                label='Loại phòng'
                rules={[
                  { required: true, message: 'Vui lòng chọn loại phòng' },
                ]}
              >
                <Select showSearch placeholder='Chọn loại phòng' allowClear>
                  {apartmentTypes.map((apartmentType: any) => (
                    <Option value={apartmentType.id}>
                      {apartmentType.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name='liveWithTheOwner'
                label='Chung chủ'
                rules={[
                  { required: true, message: 'Vui lòng chọn loại chung chủ' },
                ]}
              >
                <Radio.Group>
                  <Radio value={true}>Chung chủ</Radio>
                  <Radio value={false}>Không chung chủ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name='roomPrice'
                label='Giá cả'
                rules={[{ required: true, message: 'Vui lòng nhập giá phòng' }]}
              >
                <Input
                  type='number'
                  placeholder='Nhập giá tiền (tính theo tháng)'
                />
              </Form.Item>
              <Form.Item
                name='roomArea'
                label='Diện tích'
                rules={[
                  { required: true, message: 'Vui lòng nhập diện tích phòng' },
                ]}
              >
                <Input type='number' placeholder='Nhập diện tích (mét vuông)' />
              </Form.Item>
              <Form.Item
                name='numberRoom'
                label='Số lượng phòng'
                rules={[
                  { required: true, message: 'Vui lòng nhập số lượng phòng' },
                ]}
              >
                <Input type='number' placeholder='Nhập số lượng phòng' />
              </Form.Item>
              <Divider
                className='mb-4'
                orientation='left'
                children='Điều kiện cơ sở vật chất'
              />
              <Form.Item
                name='kitchenTypeId'
                label='Nhà bếp'
                rules={[
                  { required: true, message: 'Vui lòng chọn loại nhà bếp' },
                ]}
              >
                <Select showSearch allowClear placeholder='Chọn loại phòng bếp'>
                  {kitchenTypes.map((kitchenType: any) => (
                    <Option value={kitchenType.id}>{kitchenType.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='bathroomTypeId'
                label='Phòng tắm'
                rules={[
                  { required: true, message: 'Vui lòng chọn loại phòng tắm' },
                ]}
              >
                <Select showSearch allowClear placeholder='Chọn loại phòng tắm'>
                  {bathRoomTypes.map((bathRoomType: any) => (
                    <Option key={bathRoomType.id} value={bathRoomType.id}>
                      {bathRoomType.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label='Điều hoà'
                name='airConditional'
                required
                rules={[{ required: true, message: 'Vui lòng chọn mục này' }]}
              >
                <Radio.Group>
                  <Radio value={true}>Có</Radio>
                  <Radio value={false}>Không</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name='balcony'
                label='Ban công'
                rules={[{ required: true, message: 'Vui lòng chọn mục này' }]}
              >
                <Radio.Group>
                  <Radio value={true}>Có</Radio>
                  <Radio value={false}>Không</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name='electricityPriceType'
                label='Loại giá điện'
                rules={[
                  { required: true, message: 'Vui lòng chọn loại giá điện' },
                ]}
              >
                <Radio.Group>
                  <Radio value={true}>Giá dân</Radio>
                  <Radio value={false}>Giá thuê</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name='electricityPrice'
                label='Giá số điện'
                rules={[{ required: true, message: 'Vui lòng nhập giá điện' }]}
              >
                <Input type='number' placeholder='Giá số điện (kW/h)' />
              </Form.Item>
              <Form.Item
                name='wateryPriceType'
                label='Loại giá nước'
                rules={[
                  { required: true, message: 'Vui lòng chọn loại giá nước' },
                ]}
              >
                <Radio.Group>
                  <Radio value={true}>Giá dân</Radio>
                  <Radio value={false}>Giá thuê</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label='Giá số nước'
                name='waterPrice'
                rules={[{ required: true, message: 'Vui lòng nhập giá nước' }]}
              >
                <Input type='number' placeholder='Giá số nước (m3)' />
              </Form.Item>
              <Form.Item name='otherUtility' label='Tiện ích khác'>
                <Input placeholder='tủ lạnh/ máy giặt/giường tủ/...' />
              </Form.Item>
              <Form.Item name='detail' label='Mô tả chung '>
                <TextArea placeholder='Phòng đẹp, đầy đủ tiện nghi, view đẹp, ...' />
              </Form.Item>
              <Divider orientation='left'>* Thời gian hiển thị tin</Divider>
              <Form.Item
                name='timeShownId'
                label=''
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn thời gian hiển thị tin',
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder='Chọn khoảng thời gian'
                  allowClear
                >
                  {timeShown.map((timeShown: any) => (
                    <Option value={timeShown.id}>{timeShown.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
            {!isMobile && <SVG src={'/svgs/seo.svg'} height={250} />}
          </Space>
        </Row>
        {/* --------------- */}
        <Divider style={{ marginTop: 50, marginBottom: 50 }} />
        {/* --------------- */}
        <Row justify='center'>
          <Card
            title='Thông tin hình ảnh'
            style={{
              maxWidth: '88%',
              backgroundColor: '#f075a5',
              borderRadius: 10,
            }}
          >
            <Space direction='vertical'>
              <div className='text-white' style={{ fontSize: 18 }}>
                Upload ít nhất 3 ảnh cho bài đăng để đạt hiệu quả tốt hơn. Tin
                đăng có hình ảnh thường hiệu quả hơn 59% tin đăng không có hình
                ảnh.
              </div>
              {UploadImage(fileList, setFileList)}
            </Space>
          </Card>
        </Row>
        {/* --------------- */}
        <Divider style={{ marginTop: 80, marginBottom: 200 }}>
          <>
            <Button
              size='large'
              style={{ backgroundColor: '#f075a5', color: 'white' }}
              htmlType='submit'
            >
              Đăng Bài
            </Button>
          </>
        </Divider>
      </Form>
    </div>
  );
};
