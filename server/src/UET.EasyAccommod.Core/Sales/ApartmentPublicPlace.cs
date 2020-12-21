﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;
using UET.EasyAccommod.MasterTable;

namespace UET.EasyAccommod.Sales
{
    [Table("ApartmentPublicPlace")]
    public class ApartmentPublicPlace : FullAuditedEntity<long?>, IEntity<long?>
    {
        public long? ApartmentId { get; set; }
        public long? PublicPlaceTypeId { get; set; }
        public string Detail{ get; set; }
        public MstTypePublicPlaceType PublicPlaceType { get; set; }
    }
}
