using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace UET.EasyAccommod.Sales
{
    [Table("Apartment")]
    public class Apartment : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ProvinceId { get; set; }
        public long? DistrictId { get; set; }
        public string Address{ get; set; }
        public long? ApartmentType { get; set; }
        public long? NumberRoom { get; set; }
        public long? RoonPrice { get; set; }
        public long? UnitPriceId { get; set; }
        public long? RoomArea { get; set; }
        public bool LiveWithTheOwner { get; set; }
        public long? BathroomTypeId { get; set; }
        public bool AirConditional { get; set; }
        public long? ElectricityPrice { get; set; }
        public long? ElectricityPriceUnitId { get; set; }
        public long? WaterPrice { get; set; }
        public long? WaterPriceUnitId { get; set; }
        public string OtherUtility { get; set; }
        public long? UserOwnerId { get; set; }
        public string OwnerName { get; set; }
        public string OwnerPhone { get; set; }
        public long? TimeShownId{ get; set; }
        public DateTime? ExpirationDate{ get; set; }
        public int? IsApprove{ get; set; }
        public bool? IsEmpty{ get; set; }
        public long? View{ get; set; }
        public long? Like{ get; set; }
        public long? UserApproverId { get; set; }
    }
}