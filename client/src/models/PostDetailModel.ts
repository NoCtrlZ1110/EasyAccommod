export interface Province {
  name: string;
  description: string;
  id: number;
}

export interface ApartmentType {
  name: string;
  description: string;
  id: number;
}

export interface District {
  provinceId: number;
  name: string;
  description?: any;
  id: number;
}

export interface BathroomType {
  name: string;
  description: string;
  id: number;
}

export interface KitchenType {
  name: string;
  description: string;
  id: number;
}

export interface TimeShown {
  name: string;
  description: string;
  priceShown: number;
  id: number;
}

export interface PublicPlaceType {
  name: string;
  description: string;
  id: number;
}

export interface ApartmentPublicPlace {
  apartmentId: number;
  publicPlaceTypeId: number;
  detail: string;
  publicPlaceType: PublicPlaceType;
  id: number;
}

export interface ApartmentImage {
  apartmentId: number;
  imageUrl: string;
  id: number;
}

export interface Apartment {
  title: string;
  detail?: string;
  provinceId: number;
  districtId: number;
  address: string;
  apartmentTypeId: number;
  numberRoom: number;
  roomPrice: number;
  unitPriceId?: any;
  roomArea: number;
  liveWithTheOwner: boolean;
  bathroomTypeId: number;
  kitchenTypeId: number;
  airConditional: boolean;
  balcony: boolean;
  electricityPriceType: boolean;
  electricityPrice: number;
  waterPriceType: boolean;
  waterPrice: number;
  otherUtility: string;
  userOwnerId: number;
  ownerName: string;
  ownerPhone: string;
  timeShownId: number;
  expirationDate?: any;
  isApprove: number;
  isEmpty?: any;
  view?: any;
  like?: any;
  userApproverId?: any;
  province: Province;
  apartmentType: ApartmentType;
  district: District;
  unitPrice?: any;
  bathroomType: BathroomType;
  kitchenType: KitchenType;
  timeShown: TimeShown;
  apartmentComments: any[];
  apartmentPublicPlaces: ApartmentPublicPlace[];
  apartmentImages: ApartmentImage[];
  apartmentRates: any[];
}
