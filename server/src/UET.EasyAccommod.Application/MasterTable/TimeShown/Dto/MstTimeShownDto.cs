using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.MasterTable.TimeShown.Dto
{
    public class MstTimeShownDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long? PriceShown { get; set; }

    }
}
