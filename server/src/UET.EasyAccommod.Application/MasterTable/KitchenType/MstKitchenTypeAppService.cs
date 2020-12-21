using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UET.EasyAccommod.MasterTable.KitchenType.Dto;

namespace UET.EasyAccommod.MasterTable.KitchenType
{
    public class MstKitchenTypeAppService : EasyAccommodAppServiceBase, IMstKitchenTypeAppService
    { 
        private readonly IRepository<MstKitchenType, long?> _repository;

        public MstKitchenTypeAppService(IRepository<MstKitchenType, long?> repository)
        {
            _repository = repository;
        }

        public ListResultDto<MstKitchenTypeDto> GetListKitchenType()
        {
            var listBathroom = _repository.GetAll().ToList();
            return new ListResultDto<MstKitchenTypeDto>(ObjectMapper.Map<List<MstKitchenTypeDto>>(listBathroom));
        }
    }
}
