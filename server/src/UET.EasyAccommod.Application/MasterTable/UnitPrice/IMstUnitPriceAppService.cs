using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.UnitPrice.Dto;

namespace UET.EasyAccommod.MasterTable.UnitPrice
{
    public interface IMstUnitPriceAppService : IApplicationService
    {
        ListResultDto<MstUnitPriceDto> GetListUnitPrice();
    }
}
