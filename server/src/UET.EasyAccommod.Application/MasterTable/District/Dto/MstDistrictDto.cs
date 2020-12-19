using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.MasterTable.District.Dto
{
    public class MstDistrictDto : EntityDto<long>
    {
        public long? ProvinceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
