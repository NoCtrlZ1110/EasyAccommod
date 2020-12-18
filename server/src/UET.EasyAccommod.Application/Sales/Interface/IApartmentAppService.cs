using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using UET.EasyAccommod.Sales.Interface.DTOs.Create;
using UET.EasyAccommod.Sales.Interface.DTOs.Input;
using UET.EasyAccommod.Sales.Interface.DTOs.Output;

namespace UET.EasyAccommod.Sales.Interface
{
    public interface IApartmentAppService
    {
        Task CreateOrEditApartment(AppartmentCreateDto input);
        PagedResultDto<ApartmentListDto> GetListAppartment(GetListApartmentInput input);
        Task<ApartmentDetailDto> GetApartmentDetail(ApartmentDetailInput input);
        PagedResultDto<ApartmentListDto> GetListAppartmentOfOwner(GetListApartmentInput input);
    }
}
