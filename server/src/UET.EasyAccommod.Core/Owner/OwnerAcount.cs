using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.Owner
{
    [Table("OwnerAcount")]
    public class OwnerAcount : FullAuditedEntity<long>, IEntity<long>
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmailAddress { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public string Password { get; set; }
        public string IdCard { get; set; }
        public string Address { get; set; }
        public int? ApproveStatus { get; set; }
    }
}
