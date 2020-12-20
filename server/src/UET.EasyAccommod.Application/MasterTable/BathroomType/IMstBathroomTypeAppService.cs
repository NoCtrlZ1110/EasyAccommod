using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.BathroomType.Dto;

namespace UET.EasyAccommod.MasterTable.BathroomType
{
    public interface IMstBathroomTypeAppService : IApplicationService
    {
        ListResultDto<MstBathroomTypeDto> GetListBathRoomType();
    }
}
