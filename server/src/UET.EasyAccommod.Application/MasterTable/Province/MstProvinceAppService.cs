using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UET.EasyAccommod.MasterTable.Province.Dto;

namespace UET.EasyAccommod.MasterTable.Province
{
    public class MstProvinceAppService : EasyAccommodAppServiceBase, IMstProvinceAppService
    {
        private readonly IRepository<MstProvince, long> _mstProvinceRepo;

        public MstProvinceAppService(IRepository<MstProvince, long> mstProvinceRepo)
        {
            _mstProvinceRepo = mstProvinceRepo;
        }

        public ListResultDto<MstProvinceDto> GetProvince()
        {
            var listProvince = _mstProvinceRepo.GetAll().OrderBy(p => p.Name).ToList();
            return new ListResultDto<MstProvinceDto>(ObjectMapper.Map<List<MstProvinceDto>>(listProvince));
        }
    }
}
