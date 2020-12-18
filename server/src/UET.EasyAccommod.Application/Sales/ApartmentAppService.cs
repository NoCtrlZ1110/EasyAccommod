using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UET.EasyAccommod.Sales.Interface;
using UET.EasyAccommod.Sales.Interface.DTOs.Create;
using UET.EasyAccommod.Sales.Interface.DTOs.Create.Apartment;
using UET.EasyAccommod.Sales.Interface.DTOs.Input;
using UET.EasyAccommod.Sales.Interface.DTOs.Output;

namespace UET.EasyAccommod.Sales
{
    public class ApartmentAppService : EasyAccommodAppServiceBase, IApartmentAppService
    {
        private readonly IRepository<Apartment, long> _apartmentRepo;
        private readonly IRepository<ApartmentImage, long> _apartmentImageRepo;
        private readonly IRepository<ApartmentPublicPlace, long> _apartmentPublicPlaceRepo;
        public async Task CreateOrEditApartment(AppartmentCreateDto input)
        {
            var apartment = input.Apartment;
            long apartmentId;
            if (apartment.Id == 0)
            {
                apartmentId = CreateAppartment(apartment);
            }
            else
            {
                apartmentId = EditAppartment(apartment);
            }
            var apartmentiImages = input.ApartmentImages;
            foreach (var apartmentiImage in apartmentiImages)
            {
                apartmentiImage.ApartmentId = apartmentId;
                if (apartmentiImage.Id == 0)
                {
                    var image = ObjectMapper.Map<ApartmentImage>(apartmentiImage);
                    await _apartmentImageRepo.InsertAsync(image);
                }
                else
                {
                    var apartmentImage = await _apartmentImageRepo.FirstOrDefaultAsync(apartmentiImage.Id);
                    ObjectMapper.Map(input, apartmentImage);
                }
            }
            var apartmentPublicPlaces = input.ApartmentPublicPlaces;
            foreach (var apartmentPublicPlace in apartmentPublicPlaces)
            {
                apartmentPublicPlace.ApartmentId = apartmentId;
                if (apartmentPublicPlace.Id == 0)
                {
                    var publicPlace = ObjectMapper.Map<ApartmentPublicPlace>(apartmentPublicPlace);
                    await _apartmentPublicPlaceRepo.InsertAsync(publicPlace);
                }
                else
                {
                    var publicPlace = await _apartmentPublicPlaceRepo.FirstOrDefaultAsync(apartmentPublicPlace.Id);
                    ObjectMapper.Map(input, publicPlace);
                }
            }
        }
        private long CreateAppartment(ApartmentCreateInput input)
        {
            var appartment = ObjectMapper.Map<Apartment>(input);
            return _apartmentRepo.InsertAndGetId(appartment);
        }
        private long EditAppartment(ApartmentCreateInput input)
        {
            var apartment = _apartmentRepo.FirstOrDefault(input.Id);
            ObjectMapper.Map(input, apartment);
            return apartment.Id;
        }
        public Task<ApartmentDetailDto> GetApartmentDetail(ApartmentDetailInput input)
        {
            throw new NotImplementedException();
        }

        public PagedResultDto<ApartmentListDto> GetListAppartment(GetListApartmentInput input)
        {
            throw new NotImplementedException();
        }

        public PagedResultDto<ApartmentListDto> GetListAppartmentOfOwner(GetListApartmentInput input)
        {
            throw new NotImplementedException();
        }
    }
}
