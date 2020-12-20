using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using UET.EasyAccommod.MasterTable.ApartmentType.Dto;

namespace UET.EasyAccommod.MasterTable.ApartmentType
{
    public interface IMstApartmentTypeAppService : IApplicationService
    {
        ListResultDto<MstApartmentTypeDto> GetListApartmentType();
    }
}
