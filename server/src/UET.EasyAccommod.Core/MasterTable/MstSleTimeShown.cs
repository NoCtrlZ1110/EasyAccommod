using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.MasterTable
{
    [Table("MstSleTimeShown")]
    public class MstSleTimeShown : FullAuditedEntity<long?>, IEntity<long?>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long? PriceShown { get; set; }
    }
}
