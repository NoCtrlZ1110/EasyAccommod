// http://localhost:21021/api/services/app/MstProvince/GetProvince
import { API_URL } from './../config';
import API from './api';
export const getProvinces = (setProvinces: any) => {
  return API.get(
    `${API_URL}services/app/MstProvince/GetProvince`
  ).then((response: any) => setProvinces(response.data.result.items));
};

//api/services/app/MstDistrict/GetDistrict
export const getDistricts = (id: number, setDistricts: any) => {
  return API.get(
    `${API_URL}services/app/MstDistrict/GetDistrict?provinceId=${id}`
  ).then((response: any) => setDistricts(response.data.result.items));
};
