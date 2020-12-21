using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using UET.EasyAccommod.MasterTable.TimeShown.Dto;

namespace UET.EasyAccommod.MasterTable.TimeShown
{
    public class MstSleTimeShownAppService : EasyAccommodAppServiceBase, IMstSleTimeShownAppService
    {
        private readonly IRepository<MstSleTimeShown, long?> _repository;

        public MstSleTimeShownAppService(IRepository<MstSleTimeShown, long?> repository)
        {
            _repository = repository;
        }

        public ListResultDto<MstTimeShownDto> GetListTimeShown()
        {
            var listBathroom = _repository.GetAll().ToList();
            return new ListResultDto<MstTimeShownDto>(ObjectMapper.Map<List<MstTimeShownDto>>(listBathroom));
        }
    }
}
