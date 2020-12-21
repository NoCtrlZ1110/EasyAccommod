using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.Sales.Dto.Create.Rate
{
    public class ApartmentRateCreateDto : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public long? AssessorId { get; set; }
        public long? Rate { get; set; }
    }
}
