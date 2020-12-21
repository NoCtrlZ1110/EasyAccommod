// http://localhost:21021/api/services/app/MstProvince/GetProvince
import { toast } from 'react-toastify';
import { API_URL } from './../config';
import API from './api';
export const getProvinces = (setProvinces: any) => {
  return API.get(
    `${API_URL}services/app/MstProvince/GetProvince`
  ).then((response: any) => setProvinces(response.data.result.items));
};

//  /api/services/app/MstDistrict/GetDistrict
export const getDistricts = (id: number, setDistricts: any) => {
  return API.get(
    `${API_URL}services/app/MstDistrict/GetDistrict?provinceId=${id}`
  ).then((response: any) => setDistricts(response.data.result.items));
};

// /api/services/app/MstApartmentType/GetListApartmentType
export const getListApartmentTypes = (setApartmentTypes: any) => {
  return API.get(
    `${API_URL}services/app/MstApartmentType/GetListApartmentType`
  ).then((response: any) => setApartmentTypes(response.data.result.items));
};

// /api/services/app/MstBathroomType/GetListBathRoomType
export const getListBathRoomTypes = (setBathRoomTypes: any) => {
  return API.get(
    `${API_URL}services/app/MstBathroomType/GetListBathRoomType`
  ).then((response: any) => setBathRoomTypes(response.data.result.items));
};

// /api/services/app/MstKitchenType/GetListKitchenType
export const getListKitchenTypes = (setKitchenTypes: any) => {
  return API.get(
    `${API_URL}services/app/MstKitchenType/GetListKitchenType`
  ).then((response: any) => setKitchenTypes(response.data.result.items));
};

// /api/services/app/MstTypePublicPlaceType/GetListPublicPlaceType
export const getListPublicPlaceTypes = (setPublicPlaceTypes: any) => {
  return API.get(
    `${API_URL}services/app/MstTypePublicPlaceType/GetListPublicPlaceType`
  ).then((response: any) => setPublicPlaceTypes(response.data.result.items));
};

// /api/services/app/MstUnitPrice/GetListUnitPrice

export const getListUnitPrices = (setUnitPrices: any) => {
  return API.get(
    `${API_URL}services/app/MstUnitPrice/GetListUnitPrice`
  ).then((response: any) => setUnitPrices(response.data.result.items));
};

// api/services/app/MstSleTimeShown/GetListTimeShown

export const getListTimeShown = (setListTimeShown: any) => {
  return API.get(
    `${API_URL}services/app/MstSleTimeShown/GetListTimeShown`
  ).then((response: any) => setListTimeShown(response.data.result.items));
};

export const submitPost = (data: any) => {
  return API.post(
    API_URL + 'services/app/Apartment/CreateOrEditApartment',
    data
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success('✅ Đăng ký bài thành công');
      }
    })
    .catch((error) => {
      const err = error.response.data.error;
      toast.error(err.message + (err.details ? '\n' + err.details : ''));
    });
};
