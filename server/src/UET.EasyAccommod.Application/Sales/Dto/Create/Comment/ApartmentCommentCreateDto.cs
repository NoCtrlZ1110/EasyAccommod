using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.Sales.Dto.Create.Comment
{
    public class ApartmentCommentCreateDto: EntityDto<long>
    {
        public long? Rate { get; set; }
        public long? ApartmentId { get; set; }
        public long? UserCommentId { get; set; }
        public string CommentDetail { get; set; }
        public long? ParentCommentId { get; set; }
        public long? Status { get; set; }
        public long? Like { get; set; }
    }
}
