using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.KitchenType.Dto;

namespace UET.EasyAccommod.MasterTable.KitchenType
{
    public interface IMstKitchenTypeAppService : IApplicationService
    {
        ListResultDto<MstKitchenTypeDto> GetListKitchenType();

    }
}
