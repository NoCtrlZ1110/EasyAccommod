using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.Sales
{
    [Table("ApartmentImage")]
    public class ApartmentImage : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ApartmentId { get; set; }
        public string ImageUrl { get; set; }
    }
}
