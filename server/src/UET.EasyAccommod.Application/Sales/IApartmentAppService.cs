using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using UET.EasyAccommod.Sales.Dto.Create;
using UET.EasyAccommod.Sales.Dto.Input;
using UET.EasyAccommod.Sales.Dto.Output;

namespace UET.EasyAccommod.Sales
{
    public interface IApartmentAppService : IApplicationService
    {
        Task CreateOrEditApartment(AppartmentCreateDto input);
        PagedResultDto<ApartmentListDto> GetListAppartment(GetListApartmentInput input);
        Task<ApartmentDetailDto> GetApartmentDetail(ApartmentDetailInput input);
        PagedResultDto<ApartmentListDto> GetListAppartmentOfOwner(GetListApartmentOfOwnerInput input);
    }
}
