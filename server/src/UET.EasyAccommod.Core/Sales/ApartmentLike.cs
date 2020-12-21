using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace UET.EasyAccommod.Sales
{
    [Table("ApartmentLike")]
    public class ApartmentLike : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ApartmentId { get; set; }
        public long? LikerId { get; set; }
    }
}
