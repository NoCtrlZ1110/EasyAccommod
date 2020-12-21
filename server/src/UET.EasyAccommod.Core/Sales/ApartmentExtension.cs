using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;
namespace UET.EasyAccommod.Sales
{
    [Table("ApartmentExtension")]
    public class ApartmentExtension : FullAuditedEntity<long>, IEntity<long>
    {
        public long? ApartmentId { get; set; }
        public long? TimeShownId { get; set; }
        public int? StatusExtension { get; set; }
    }
}
