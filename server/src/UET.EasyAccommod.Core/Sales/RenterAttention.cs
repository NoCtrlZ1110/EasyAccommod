using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.Sales
{
    [Table("RenterAttention")]
    public class RenterAttention : FullAuditedEntity<long?>, IEntity<long?>
    {
        public long? RenterId { get; set; }
        public long? ApartmentId { get; set; }
    }
}
