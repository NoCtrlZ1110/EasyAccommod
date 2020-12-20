using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.PublicPlaceType.Dto;

namespace UET.EasyAccommod.MasterTable.PublicPlaceType
{
    public interface IMstTypePublicPlaceTypeAppService : IApplicationService
    {
        ListResultDto<MstPublicPlaceTypeDto> GetListPublicPlaceType();
    }
}
