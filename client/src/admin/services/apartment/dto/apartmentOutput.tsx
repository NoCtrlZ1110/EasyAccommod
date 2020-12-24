export interface ApartmentOutput {
    title: string;
    detail: string;
    provinceId: number;
    districtId: number;
    address: string;
    apartmentTypeId: number;
    numberRoom: number;
    roomPrice: number;
    unitPriceId: number;
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
    expirationDate: Date;
    isApprove: number;
    isEmpty: boolean;
    view: number;
    like: number;
    userApproverId: number;
    province: ApartmentType;
    apartmentType: ApartmentType;
    district: ApartmentType;
    unitPrice: ApartmentType;
    apartmentImages: ApartmentImage[];
    isDeleted: boolean;
    deleterUserId: number;
    deletionTime: Date;
    lastModificationTime: Date;
    lastModifierUserId: number;
    creationTime: Date;
    creatorUserId: number;
    id: number;
}

export interface ApartmentImage {
    apartmentId: number;
    imageUrl: string;
    id: number;
}

export interface ApartmentType {
    name: string;
    description: string;
    id: number;
    provinceId?: number;
}
