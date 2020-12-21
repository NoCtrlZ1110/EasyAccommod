using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace UET.EasyAccommod.Sales
{
    [Table("ApartmentComment")]
    public class ApartmentComment : FullAuditedEntity<long?>, IEntity<long?>
    {
        public long? Rate { get; set; }
        public long? ApartmentId { get; set; }
        public long? UserCommentId { get; set; }
        public string CommentDetail{ get; set; }
        public long? ParentCommentId{ get; set; }
        public long? Status { get; set; }
        public long? Like{ get; set; }
    }
}
