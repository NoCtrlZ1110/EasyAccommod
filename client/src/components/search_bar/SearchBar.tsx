import Search from 'antd/lib/input/Search';
import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as Filter } from '../../assets/svgs/filter.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import history from '../../services/history';
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Spin,
  Tag,
} from 'antd';

import {
  FilterSearch,
  getDistricts,
  getListApartmentTypes,
  getProvinces,
} from '../../services/post';
import { useLocation } from 'react-router-dom';

export const SearchBar: React.FC<FilterSearch> = (filter?: FilterSearch) => {
  const height = 55;
  const [visible, setVisible] = useState(false);
  const [isSearching, setSearching] = useState(false);
  const { Option } = Select;
  const [apartmentTypes, setApartmentTypes] = useState([]);
  const [currentProvince, setCurrentProvinces] = useState<number>();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [ProvinceId, setProvinceId] = useState(filter?.ProvinceId);
  const [DistrictId, setDistrictId] = useState(filter?.DistrictId);
  const [ApartmentTypeId, setApartmentTypeId] = useState(
    filter?.ApartmentTypeId
  );
  const [StayWithOwner, setStayWithOwner] = useState(
    filter?.StayWithOwner != null ? filter?.StayWithOwner : null
  );
  const [PriceFrom, setPriceFrom] = useState(filter?.PriceFrom);
  const [AreaFrom, setAreaFrom] = useState(filter?.AreaFrom);
  const [AreaTo, setAreaTo] = useState(filter?.AreaTo);
  const formRef = useRef(null);
  let location = useLocation();

  useEffect(() => {
    getProvinces(setProvinces);
    getListApartmentTypes(setApartmentTypes);
  }, []);

  useEffect(() => {
    if (currentProvince) getDistricts(currentProvince as number, setDistricts);
    (formRef as any).current?.setFieldsValue({ districtId: null });
  }, [currentProvince]);

  const apartmentType = (id: any) => {
    switch (id) {
      case 1:
        return 'phòng trọ';
      case 2:
        return 'chung cư mini';
      case 3:
        return 'nhà nguyên căn';
      case 5:
        return 'chung cư nguyên căn';
      default:
        return '';
    }
  };

  const onSearch = (_title: string) => {
    let filterQuery = '';
    filterQuery += `?Title=${_title}`;

    if (ProvinceId) {
      filterQuery += `&ProvinceId=${ProvinceId}`;
    }
    if (DistrictId) {
      filterQuery += `&DistrictId=${DistrictId}`;
    }
    if (ApartmentTypeId) {
      filterQuery += `&ApartmentTypeId=${ApartmentTypeId}`;
    }
    if (StayWithOwner != null) {
      filterQuery += `&StayWithOwner=${StayWithOwner}`;
    }
    if (PriceFrom) {
      filterQuery += `&PriceFrom=${PriceFrom}`;
    }
    if (AreaFrom) {
      filterQuery += `&AreaFrom=${AreaFrom}`;
    }
    if (AreaTo) {
      filterQuery += `&AreaTo=${AreaTo}`;
    }

    setSearching(true);
    toast.info('🧐 Đang tìm nhà trọ thích hợp 🔎', {
      autoClose: 3000,
    });
    if (location.pathname === '/search/result') {
      window.location.href = '/search/result' + filterQuery;
    } else
      setTimeout(() => {
        setSearching(false);
        history.push('/search/result' + filterQuery);
      }, 2000);
  };

  const handleSave = (values: any) => {
    setProvinceId(values.ProvinceId);
    setDistrictId(values.DistrictId);
    setApartmentTypeId(values.ApartmentTypeId);
    setStayWithOwner(values.StayWithOwner);
    setPriceFrom(values.PriceFrom);
    setAreaFrom(values.AreaFrom);
    setAreaTo(values.AreaTo);
  };

  return (
    <>
      <div className='search-bar mx-3'>
        <Spin spinning={isSearching}>
          <Search
            height={height}
            addonBefore={
              <Button
                className='filter-btn'
                icon={<Filter fill='#508f55' height={30} width={30} />}
                style={{
                  height: height,
                  width: height,
                  border: '3px solid #508f55;',
                }}
                onClick={() => setVisible(true)}
              ></Button>
            }
            placeholder='nhập thông tin tìm kiếm '
            allowClear
            enterButton={
              <Button
                style={{
                  height: height,
                  backgroundColor: '#508f55',
                  color: 'white',
                }}
              >
                <span style={{ fontSize: 18, marginRight: 10 }}>Tìm kiếm</span>
                <FontAwesomeIcon icon={faSearch} size='lg' />
              </Button>
            }
            onChange={(value) => {
              console.log(value.target.value);
            }}
            defaultValue={filter?.Title ? filter?.Title : ''}
            onSearch={onSearch}
            // onSearch={(value) => {
            //   setSearching(true);
            //   toast.info('🧐 Đang tìm nhà trọ thích hợp 🔎', {
            //     autoClose: 3000,
            //   });
            //   setTimeout(() => {
            //     toast.error(' 😪 Không tìm thấy kết quả nào!');
            //     setSearching(false);
            //   }, 5000);
            // }}
          ></Search>
        </Spin>
      </div>

      <div className='ml-4 mt-3'>
        {ProvinceId && <Tag color='#55acee'>ProvinceId: {ProvinceId}</Tag>}
        {DistrictId && <Tag color='#cd201f'>DistrictId: {DistrictId}</Tag>}
        {ApartmentTypeId && (
          <Tag color='#cd201f'>Loại nhà: {apartmentType(ApartmentTypeId)}</Tag>
        )}
        {StayWithOwner !== null && (
          <Tag color='#3b5999'>
            {StayWithOwner ? 'Chung chủ' : 'Không chung chủ'}
          </Tag>
        )}
        {PriceFrom && (
          <Tag color='#55acee'>
            giá từ {PriceFrom.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </Tag>
        )}
        {AreaFrom && (
          <Tag color='#55acee'>
            diện tích từ {AreaFrom}
            {AreaTo && <> tới {AreaTo}</>}
          </Tag>
        )}
      </div>

      <div className='text-center mt-4'>
        {isSearching && (
          <code style={{ fontSize: 25 }}>🔍 Đang tìm kiếm ~~~</code>
        )}
      </div>
      <Modal
        title='Bộ lọc'
        centered
        visible={visible}
        okText='Lưu'
        cancelText='Huỷ'
        onOk={() => {
          setVisible(false);
          (formRef as any).current.submit();
        }}
        onCancel={() => setVisible(false)}
      >
        <Form ref={formRef} onFinish={handleSave}>
          <Space direction={'vertical'}>
            <>
              <Form.Item name='ProvinceId' label='Tỉnh/ thành phố'>
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
              <Form.Item name='DistrictId' label='Quận/ huyện'>
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
              <Form.Item name='ApartmentTypeId' label='Loại phòng'>
                <Select showSearch placeholder='Chọn loại phòng' allowClear>
                  {apartmentTypes.map((apartmentType: any) => (
                    <Option value={apartmentType.id}>
                      {apartmentType.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name='StayWithOwner' label='Chung chủ'>
                <Radio.Group>
                  <Radio value={true}>Chung chủ</Radio>
                  <Radio value={false}>Không chung chủ</Radio>
                </Radio.Group>
              </Form.Item>
            </>
            <>
              <Form.Item name='PriceFrom' label='Giá từ'>
                <Input type='number' placeholder='Nhập giá tiền ' />
              </Form.Item>
              <Form.Item name='AreaFrom' label='Diện tích từ'>
                <Input type='number' placeholder='Nhập diện tích' />
              </Form.Item>
              <Form.Item name='AreaTo' label='Diện tích tới'>
                <Input type='number' placeholder='Nhập diện tích' />
              </Form.Item>
            </>
          </Space>
        </Form>
      </Modal>
    </>
  );
};
