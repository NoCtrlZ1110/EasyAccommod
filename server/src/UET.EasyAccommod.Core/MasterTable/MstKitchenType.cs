using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.MasterTable
{
    [Table("MstKitchenType")]
    public class MstKitchenType : FullAuditedEntity<long>, IEntity<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
