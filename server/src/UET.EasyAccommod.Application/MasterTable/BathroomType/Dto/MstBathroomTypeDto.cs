using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.MasterTable.BathroomType.Dto
{
    public class MstBathroomTypeDto:EntityDto<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
