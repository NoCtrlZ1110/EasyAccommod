using AutoMapper;
using UET.EasyAccommod.MasterTable;
using UET.EasyAccommod.MasterTable.District.Dto;
using UET.EasyAccommod.MasterTable.Province.Dto;
using UET.EasyAccommod.Sales;
using UET.EasyAccommod.Sales.Dto.Create.Apartment;

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
        }
    }
}
