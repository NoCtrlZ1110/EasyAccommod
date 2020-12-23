// http://localhost:21021/api/services/app/MstProvince/GetProvince
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import API from './api';
import { getAccessToken } from './auth';
import history from '../services/history';

const handleError = (error: any) => {
  const err = error?.response?.data?.error;
  if (err) {
    toast.error(err.message + (err.details ? '\n' + err.details : ''));
  }
};

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
    data,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success(
          '✅ Tạo bài thành công, bài viết sẽ được hiển thị sau khi được phê duyệt!'
        );
        history.push('/profile/pending-post');
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

// services/app/Apartment/SendNewsRate
/* {
  "apartmentId": 10,
  "assessorId": 4,
  "rate": 3,
} */

export const ratePost = (rate: any, apartmentId: any, callback?: any) => {
  const data = {
    rate,
    apartmentId,
  };
  return API.post(API_URL + 'services/app/Apartment/SendNewsRate', data, {
    headers: { Authorization: 'Bearer ' + getAccessToken() },
  })
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success('✅ Đánh giá thành công!');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

// api/services/app/Apartment/GetListAppartmentOfOwner?Status=1&MaxResultCount=99
// GetListAppartmentOfOwner?Title=tr%E1%BB%8D&DateFrom=1%2F1%2F2000&DateTo=1%2F1%2F2020&Status=1&SkipCount=0&MaxResultCount=99
export const getPendingPosts = (
  setPendingPosts: any,
  filter?: { title?: string; dateFrom?: any; dateTo?: any }
) => {
  let filterQuery = '';
  if (filter?.title) {
    filterQuery += `&Title=${filter?.title}`;
  }
  if (filter?.dateFrom) {
    filterQuery += `&DateFrom=${filter?.dateFrom}`;
  }
  if (filter?.dateTo) {
    filterQuery += `&DateTo=${filter?.dateTo}`;
  }
  return API.get(
    API_URL +
      'services/app/Apartment/GetListAppartmentOfOwner?Status=1&MaxResultCount=999' +
      filterQuery,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data.result.items;
      setPendingPosts(data);
    })
    .catch((error) => {
      handleError(error);
    });
};

export const getAprrovedPost = (
  setApprovedPost: any,
  filter?: { title?: string; dateFrom?: any; dateTo?: any }
) => {
  let filterQuery = '';
  if (filter?.title) {
    filterQuery += `&Title=${filter?.title}`;
  }
  if (filter?.dateFrom) {
    filterQuery += `&DateFrom=${filter?.dateFrom}`;
  }
  if (filter?.dateTo) {
    filterQuery += `&DateTo=${filter?.dateTo}`;
  }
  return API.get(
    API_URL +
      'services/app/Apartment/GetListAppartmentOfOwner?Status=2&MaxResultCount=999' +
      filterQuery,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data.result.items;
      setApprovedPost(data);
    })
    .catch((error) => {
      handleError(error);
    });
};
export const getExpiredPost = (
  setExpriedPosts: any,
  filter?: { title?: string; dateFrom?: any; dateTo?: any }
) => {
  let filterQuery = '';
  if (filter?.title) {
    filterQuery += `&Title=${filter?.title}`;
  }
  if (filter?.dateFrom) {
    filterQuery += `&DateFrom=${filter?.dateFrom}`;
  }
  if (filter?.dateTo) {
    filterQuery += `&DateTo=${filter?.dateTo}`;
  }
  return API.get(
    API_URL +
      'services/app/Apartment/GetListAppartmentOfOwner?Status=3&MaxResultCount=999' +
      filterQuery,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data.result.items;
      setExpriedPosts(data);
    })
    .catch((error) => {
      handleError(error);
    });
};

// /api/services/app/Apartment/DeleteNewsApartment?apartmentId=
export const deletePost = (id: any, callback?: any) => {
  return API.delete(
    API_URL + `services/app/Apartment/DeleteNewsApartment?apartmentId=${id}`,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      if (response.data?.success) {
        toast.success('Xoá post thành công!');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

// api/services/app/Apartment/GetApartmentDetail?ApartmentId=10

export const getPostDetail = (id: any, setPostDetail: any) => {
  return API.get(
    API_URL + 'services/app/Apartment/GetApartmentDetail?ApartmentId=' + id,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data.result;
      setPostDetail(data);
      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      handleError(error);
      toast.error('Bài viết không tồn tại!');
      history.push('/');
    });
};

// /api/services/app/Apartment/CreateOrEditNewsComment

/* {
  "apartmentId": 11,
  "commentDetail": "test commenttttttt",
} */

export const commentPost = (id: any, text: string, callback?: any) => {
  return API.post(
    API_URL + 'services/app/Apartment/CreateOrEditNewsComment',
    {
      apartmentId: id,
      commentDetail: text,
    },
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success('✅ Comment thành công');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

export const likePost = (id: any, callback?: any) => {
  return API.post(
    API_URL + 'services/app/Apartment/LikeNewsApartment',
    {
      apartmentId: id,
    },
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success('✅ Like post thành công');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};
export const addPostToFavorite = (id: any, callback?: any) => {
  return API.post(
    API_URL + 'services/app/Apartment/MarkIsFavorite',
    {
      apartmentId: id,
    },
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success('💗 Đã thêm bài viết vào danh sách yêu thích');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};
export const markRent = (id: any, callback?: any) => {
  return API.post(
    API_URL +
      'services/app/Apartment/MarkIsRented?status=true&apartmentId=' +
      id,
    {},
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        toast.success('Đã chuyển trạng thái bài viết sang đã cho thuê');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

// api/services/app/Apartment/GetListComment?apartmentId=11&MaxResultCount=22

export const getPostComment = (id: any, setComments: any) => {
  return API.get(
    `${API_URL}services/app/Apartment/GetListComment?apartmentId=${id}&MaxResultCount=999`,
    { headers: { Authorization: 'Bearer ' + getAccessToken() } }
  )
    .then((response) => {
      const data = response.data.result.items;
      setComments(data);
    })
    .catch((error) => {
      handleError(error);
    });
};

export const deletePostComment = (id: any, callback?: any) => {
  return API.delete(
    `${API_URL}services/app/Apartment/DeleteNewsComment?commentId=${id}`,
    {
      headers: { Authorization: 'Bearer ' + getAccessToken() },
    }
  )
    .then((response) => {
      const data = response.data;
      if (data?.success) {
        toast.success('✅ Xoá comment thành công');
        if (callback) {
          callback();
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};

// http://localhost:21021/api/services/app/Apartment/GetListAppartment?Title=111&ProvinceId=111&DistrictId=11&ApartmentTypeId=111&StayWithOwner=true&UnitPriceId=11&PriceFrom=111&PriceTo=11&AreaFrom=111&AreaTo=11&SkipCount=111&MaxResultCount=111

export interface FilterSearch {
  Title?: any;
  ProvinceId?: any;
  DistrictId?: any;
  ApartmentTypeId?: any;
  StayWithOwner?: any;
  UnitPriceId?: any;
  PriceFrom?: any;
  AreaFrom?: any;
  AreaTo?: any;
  SkipCount?: any;
}

export const searchPost = (
  filter: FilterSearch,
  setSearchResult?: any,
  isHome?: any
) => {
  let filterQuery = '';
  if (filter?.Title) {
    filterQuery += `&Title=${filter?.Title}`;
  }
  if (filter?.ProvinceId) {
    filterQuery += `&ProvinceId=${filter?.ProvinceId}`;
  }
  if (filter?.DistrictId) {
    filterQuery += `&DistrictId=${filter?.DistrictId}`;
  }
  if (filter?.ApartmentTypeId) {
    filterQuery += `&ApartmentTypeId=${filter?.ApartmentTypeId}`;
  }
  if (filter?.StayWithOwner) {
    filterQuery += `&StayWithOwner=${filter?.StayWithOwner}`;
  }
  if (filter?.UnitPriceId) {
    filterQuery += `&UnitPriceId=${filter?.UnitPriceId}`;
  }
  if (filter?.PriceFrom) {
    filterQuery += `&PriceFrom=${filter?.PriceFrom}`;
  }
  if (filter?.AreaFrom) {
    filterQuery += `&AreaFrom=${filter?.AreaFrom}`;
  }
  if (filter?.AreaTo) {
    filterQuery += `&AreaTo=${filter?.AreaTo}`;
  }
  if (filter?.SkipCount) {
    filterQuery += `&AreaTo=${filter?.SkipCount}`;
  }
  API.get(
    API_URL +
      'services/app/Apartment/GetListAppartment?MaxResultCount=9999' +
      filterQuery,
    {
      headers: { Authorization: 'Bearer ' + getAccessToken() },
    }
  )
    .then((response) => {
      const data = response.data;
      if (data.success) {
        const result = data.result.items;
        if (!isHome) toast.success(`✅ Tìm thấy ${result.length} kết quả!`);
        if (setSearchResult) {
          setSearchResult(result);
        }
      }
    })
    .catch((error) => {
      handleError(error);
    });
};
