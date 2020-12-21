using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UET.EasyAccommod.MasterTable.UnitPrice.Dto;

namespace UET.EasyAccommod.MasterTable.UnitPrice
{
    public class MstUnitPriceAppService : EasyAccommodAppServiceBase, IMstUnitPriceAppService
    {
        private readonly IRepository<MstUnitPrice, long?> _repository;

        public MstUnitPriceAppService(IRepository<MstUnitPrice, long?> repository)
        {
            _repository = repository;
        }

        public ListResultDto<MstUnitPriceDto> GetListUnitPrice()
        {
            var listBathroom = _repository.GetAll().ToList();
            return new ListResultDto<MstUnitPriceDto>(ObjectMapper.Map<List<MstUnitPriceDto>>(listBathroom));
        }
    }
}
