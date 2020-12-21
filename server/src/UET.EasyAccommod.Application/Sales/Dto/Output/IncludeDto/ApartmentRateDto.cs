using Abp.Application.Services.Dto;

namespace UET.EasyAccommod.Sales.Dto.Output.IncludeDto
{
    public class ApartmentRateDto : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public long? AssessorId { get; set; }
        public long? Rate { get; set; }
    }
}