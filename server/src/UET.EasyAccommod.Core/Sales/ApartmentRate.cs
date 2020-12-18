using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.Sales
{
    [Table("ApartmentRate")]
    public class ApartmentRate : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ApartmentId { get; set; }
        public long? AssessorId { get; set; }
        public long? Rate { get; set; }
    }
}
