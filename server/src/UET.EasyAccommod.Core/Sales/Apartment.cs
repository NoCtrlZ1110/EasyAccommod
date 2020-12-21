using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using UET.EasyAccommod.MasterTable;

namespace UET.EasyAccommod.Sales
{
    [Table("Apartment")]
    public class Apartment : FullAuditedEntity<long?>, IEntity<long?>
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
        // 0 : Approving
        // 1 : Approve 
        // 2 : Reject 
        public bool? IsEmpty { get; set; }
        public long? View { get; set; }
        public long? Like { get; set; }
        public long? UserApproverId { get; set; }
        public MstProvince Province { get; set; }
        public MstApartmentType ApartmentType { get; set; }
        public MstDistrict District { get; set; }
        public MstUnitPrice UnitPrice { get; set; }
        public MstBathroomType BathroomType { get; set; }
        public MstKitchenType KitchenType { get; set; }
        public MstSleTimeShown TimeShown { get; set; }
        public IList<ApartmentComment> ApartmentComments { get; set; }
        public IList<ApartmentPublicPlace> ApartmentPublicPlaces { get; set; }
        public IList<ApartmentImage> ApartmentImages { get; set; }
        public IList<ApartmentRate> ApartmentRates { get; set; }

    }
}