using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UET.EasyAccommod.MasterTable.District.Dto;

namespace UET.EasyAccommod.MasterTable.District
{
    public class MstDistrictAppService : EasyAccommodAppServiceBase, IMstDistrictAppService
    {
        private readonly IRepository<MstDistrict, long> _mstDistriRepo;

        public MstDistrictAppService(IRepository<MstDistrict, long> mstDistriRepo)
        {
            _mstDistriRepo = mstDistriRepo;
        }

        public ListResultDto<MstDistrictDto> GetDistrict(long provinceId)
        {
            var _listDistrict = _mstDistriRepo
                .GetAll()
                .Where(d => d.ProvinceId == provinceId)
                .ToList();
            return new ListResultDto<MstDistrictDto>(ObjectMapper.Map<List<MstDistrictDto>>(_listDistrict));
        }
    }
}
