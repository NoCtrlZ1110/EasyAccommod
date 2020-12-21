using AutoMapper;
using UET.EasyAccommod.Authorization.Users;
using UET.EasyAccommod.MasterTable;
using UET.EasyAccommod.MasterTable.ApartmentType.Dto;
using UET.EasyAccommod.MasterTable.BathroomType.Dto;
using UET.EasyAccommod.MasterTable.District.Dto;
using UET.EasyAccommod.MasterTable.KitchenType.Dto;
using UET.EasyAccommod.MasterTable.Province.Dto;
using UET.EasyAccommod.MasterTable.PublicPlaceType.Dto;
using UET.EasyAccommod.MasterTable.TimeShown.Dto;
using UET.EasyAccommod.MasterTable.UnitPrice.Dto;
using UET.EasyAccommod.Sales;
using UET.EasyAccommod.Sales.Dto.Create.Apartment;
using UET.EasyAccommod.Sales.Dto.Create.Comment;
using UET.EasyAccommod.Sales.Dto.Create.Rate;
using UET.EasyAccommod.Sales.Dto.Output;
using UET.EasyAccommod.Sales.Dto.Output.IncludeDto;
using UET.EasyAccommod.Users.Dto;

namespace UET.EasyAccommod
{
    internal static class CustomDtoMapper
    {
        public static void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<ApartmentCreateInput, Apartment>();
            configuration.CreateMap<ApartmentImageCreateInput, ApartmentImage>();
            configuration.CreateMap<ApartmentPublicPlaceCreateInput, ApartmentPublicPlace>();
            configuration.CreateMap<MstProvince, MstProvinceDto>();
            configuration.CreateMap<MstDistrict, MstDistrictDto>();
            configuration.CreateMap<MstApartmentType, MstApartmentTypeDto>();
            configuration.CreateMap<MstBathroomType, MstBathroomTypeDto>();
            configuration.CreateMap<MstKitchenType, MstKitchenTypeDto>();
            configuration.CreateMap<MstTypePublicPlaceType, MstPublicPlaceTypeDto>();
            configuration.CreateMap<MstSleTimeShown, MstTimeShownDto>();
            configuration.CreateMap<MstUnitPrice, MstUnitPriceDto>();
            configuration.CreateMap<ApartmentComment, ApartmentCommentDto>();
            configuration.CreateMap<ApartmentPublicPlace, ApartmentPublicPlaceDto>();
            configuration.CreateMap<ApartmentImage, ApartmentImageDto>();
            configuration.CreateMap<ApartmentRate, ApartmentRateDto>();
            configuration.CreateMap<Apartment, ApartmentDetailDto>();
            configuration.CreateMap<Apartment, ApartmentListDto>();
            configuration.CreateMap<EditUser, User>();
            configuration.CreateMap<ApartmentCommentCreateDto, ApartmentComment>();
            configuration.CreateMap<ApartmentRateCreateDto, ApartmentRate>();
        }
    }
}
