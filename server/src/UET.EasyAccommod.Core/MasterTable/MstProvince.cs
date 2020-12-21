using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.MasterTable
{
    [Table("MstProvince")]
    public class MstProvince : FullAuditedEntity<long>, IEntity<long>
    {
        public string Name{ get; set; }
        public string Description{ get; set; }
    }
}
