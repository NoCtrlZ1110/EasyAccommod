using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.District.Dto;

namespace UET.EasyAccommod.MasterTable.District
{
    public interface IMstDistrictAppService : IApplicationService
    {
        ListResultDto<MstDistrictDto> GetDistrict(long provinceId);
    }
}
