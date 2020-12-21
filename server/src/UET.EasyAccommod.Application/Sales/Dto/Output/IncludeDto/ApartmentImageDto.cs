using Abp.Application.Services.Dto;

namespace UET.EasyAccommod.Sales.Dto.Output.IncludeDto
{
    public class ApartmentImageDto : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public string ImageUrl { get; set; }
    }
}