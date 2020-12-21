using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;
namespace UET.EasyAccommod.Sales
{
    [Table("RenterReport")]
    public class RenterReport : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ReporterId{ get; set; }
        public long? ApartmentId{ get; set; }
        public long? Detail{ get; set; }
    }
}
