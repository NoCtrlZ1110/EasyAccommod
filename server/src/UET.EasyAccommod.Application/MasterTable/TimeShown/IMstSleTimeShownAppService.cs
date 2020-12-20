using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.TimeShown.Dto;

namespace UET.EasyAccommod.MasterTable.TimeShown
{
    public interface IMstSleTimeShownAppService : IApplicationService
    {
        ListResultDto<MstTimeShownDto> GetListTimeShown();

    }
}
