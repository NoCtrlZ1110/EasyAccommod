using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UET.EasyAccommod.MasterTable.BathroomType.Dto;

namespace UET.EasyAccommod.MasterTable.BathroomType
{
    public class MstBathroomTypeAppService : EasyAccommodAppServiceBase, IMstBathroomTypeAppService
    {
        private readonly IRepository<MstBathroomType, long> _repository;

        public MstBathroomTypeAppService(IRepository<MstBathroomType, long> repository)
        {
            _repository = repository;
        }

        public ListResultDto<MstBathroomTypeDto> GetListBathRoomType()
        {
            var listBathroom = _repository.GetAll().ToList();
            return new ListResultDto<MstBathroomTypeDto>(ObjectMapper.Map<List<MstBathroomTypeDto>>(listBathroom));
        }
    }
}
