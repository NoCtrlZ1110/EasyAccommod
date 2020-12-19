using Abp.Application.Services;
using Abp.Application.Services.Dto;
using UET.EasyAccommod.MasterTable.Province.Dto;

namespace UET.EasyAccommod.MasterTable.Province
{
    public interface IMstProvinceAppService : IApplicationService
    {
        ListResultDto<MstProvinceDto> GetProvince(); 
    }
}
