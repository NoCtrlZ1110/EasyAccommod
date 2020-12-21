using Abp.Application.Services.Dto;

namespace UET.EasyAccommod.Sales.Dto.Output.IncludeDto
{
    public class ApartmentCommentDto : FullAuditedEntityDto<long>
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