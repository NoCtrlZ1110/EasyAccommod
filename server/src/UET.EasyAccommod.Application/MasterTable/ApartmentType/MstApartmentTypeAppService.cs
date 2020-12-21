using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using UET.EasyAccommod.MasterTable.ApartmentType.Dto;

namespace UET.EasyAccommod.MasterTable.ApartmentType
{
    public class MstApartmentTypeAppService : EasyAccommodAppServiceBase, IMstApartmentTypeAppService
    {
        private readonly IRepository<MstApartmentType, long?> _mstApartmentTypeRepo;

        public MstApartmentTypeAppService(IRepository<MstApartmentType, long?> mstApartmentTypeRepo)
        {
            _mstApartmentTypeRepo = mstApartmentTypeRepo;
        }

        public ListResultDto<MstApartmentTypeDto> GetListApartmentType()
        {
            var listApartments = _mstApartmentTypeRepo.GetAll().ToList();
            return new ListResultDto<MstApartmentTypeDto>(ObjectMapper.Map<List<MstApartmentTypeDto>>(listApartments));
        }
    }
}
