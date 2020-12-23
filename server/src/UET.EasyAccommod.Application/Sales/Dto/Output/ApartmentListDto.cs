using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UET.EasyAccommod.MasterTable.ApartmentType.Dto;
using UET.EasyAccommod.MasterTable.District.Dto;
using UET.EasyAccommod.MasterTable.Province.Dto;
using UET.EasyAccommod.MasterTable.UnitPrice.Dto;
using UET.EasyAccommod.Sales.Dto.Output.IncludeDto;

namespace UET.EasyAccommod.Sales.Dto.Output
{
    public class ApartmentListDto : EntityDto<long>
    {
        public string Title { get; set; }
        public string Detail { get; set; }
        public long? ProvinceId { get; set; }
        public long? DistrictId { get; set; }
        public string Address { get; set; }
        public long? ApartmentTypeId { get; set; }
        public long? NumberRoom { get; set; }
        public long? RoomPrice { get; set; }
        public long? UnitPriceId { get; set; }
        public long? RoomArea { get; set; }
        public bool LiveWithTheOwner { get; set; }
        public long? BathroomTypeId { get; set; }
        public long? KitchenTypeId { get; set; }
        public bool AirConditional { get; set; }
        public bool Balcony { get; set; }
        public bool ElectricityPriceType { get; set; }
        public long? ElectricityPrice { get; set; }
        public bool WaterPriceType { get; set; }
        public long? WaterPrice { get; set; }
        public string OtherUtility { get; set; }
        public long? UserOwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerPhone { get; set; }
        public long? TimeShownId { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public int? IsApprove { get; set; }
        public bool? IsEmpty { get; set; }
        public long? View { get; set; }
        public long? Like { get; set; }
        public long? UserApproverId { get; set; }
        public MstProvinceDto Province { get; set; }
        public MstApartmentTypeDto ApartmentType { get; set; }
        public MstDistrictDto District { get; set; }
        public MstUnitPriceDto UnitPrice { get; set; }
        public List<ApartmentImageDto> ApartmentImages { get; set; }
    }
}
