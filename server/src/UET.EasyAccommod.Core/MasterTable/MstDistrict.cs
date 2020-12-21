using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UET.EasyAccommod.MasterTable
{
    [Table("MstDistrict")]
    public class MstDistrict : FullAuditedEntity<long?>, IEntity<long?>
    {
        public long? ProvinceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
