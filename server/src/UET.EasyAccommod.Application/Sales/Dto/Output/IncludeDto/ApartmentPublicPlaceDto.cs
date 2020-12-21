using Abp.Application.Services.Dto;
using UET.EasyAccommod.MasterTable.PublicPlaceType.Dto;

namespace UET.EasyAccommod.Sales.Dto.Output.IncludeDto
{
    public class ApartmentPublicPlaceDto : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public long? PublicPlaceTypeId { get; set; }
        public string Detail { get; set; }
        public MstPublicPlaceTypeDto PublicPlaceType { get; set; }
    }
}