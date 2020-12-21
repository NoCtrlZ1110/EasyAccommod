using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UET.EasyAccommod.MasterTable.KitchenType.Dto;
using UET.EasyAccommod.MasterTable.PublicPlaceType.Dto;

namespace UET.EasyAccommod.MasterTable.PublicPlaceType
{
    public class MstTypePublicPlaceTypeAppService : EasyAccommodAppServiceBase, IMstTypePublicPlaceTypeAppService
    {
        private readonly IRepository<MstTypePublicPlaceType, long?> _repository;

        public MstTypePublicPlaceTypeAppService(IRepository<MstTypePublicPlaceType, long?> repository)
        {
            _repository = repository;
        }

        public ListResultDto<MstPublicPlaceTypeDto> GetListPublicPlaceType()
        {
            var listBathroom = _repository.GetAll().ToList();
            return new ListResultDto<MstPublicPlaceTypeDto>(ObjectMapper.Map<List<MstPublicPlaceTypeDto>>(listBathroom));
        }
    }
}
