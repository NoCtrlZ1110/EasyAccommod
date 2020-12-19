using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web.Http;
using UET.EasyAccommod.Sales.Dto.Create;
using UET.EasyAccommod.Sales.Dto.Create.Apartment;
using UET.EasyAccommod.Sales.Dto.Create.Image;
using UET.EasyAccommod.Sales.Dto.Input;
using UET.EasyAccommod.Sales.Dto.Output;

namespace UET.EasyAccommod.Sales
{
    public class ApartmentAppService : EasyAccommodAppServiceBase, IApartmentAppService
    {
        private readonly IRepository<Apartment, long> _apartmentRepo;
        private readonly IRepository<ApartmentImage, long> _apartmentImageRepo;
        private readonly IRepository<ApartmentPublicPlace, long> _apartmentPublicPlaceRepo;

        public ApartmentAppService(IRepository<Apartment, long> apartmentRepo,
                                   IRepository<ApartmentImage, long> apartmentImageRepo,
                                   IRepository<ApartmentPublicPlace, long> apartmentPublicPlaceRepo)
        {
            _apartmentRepo = apartmentRepo;
            _apartmentImageRepo = apartmentImageRepo;
            _apartmentPublicPlaceRepo = apartmentPublicPlaceRepo;
        }

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
        public async Task<List<ApartmentImageCreateInput>> UploadImageDelivery([FromForm] ImageInput input)
        {
            List<ApartmentImageCreateInput> url = new List<ApartmentImageCreateInput>();
            var img = input.Images;

            if (img == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No Image"))

                };

                throw new HttpResponseException(response);
            }
            foreach (var image in input.Images)
            {
                var file = image;
                var ms = new MemoryStream();
                file.CopyTo(ms);

                string fileName = GetMD5HashFromFile(ms) + DateTime.Now.ToFileTime().ToString() + Path.GetExtension(file.FileName);
                string urlImage = "/Imgs/" + fileName;
                if (await SaveImage(file, fileName))
                {
                    url.Add(new ApartmentImageCreateInput
                    {
                        Id = 0,
                        ApartmentId = 0,
                        ImageUrl = urlImage
                    }); ;
                }
                else
                {
                    var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                    {
                        Content = new StringContent(string.Format("Load image false"))

                    };

                    throw new HttpResponseException(response);
                }
            }
            return url;
        }

        private async Task<bool> SaveImage(IFormFile file, string fileName)
        {

            if (file.Length > 0)
            {
                var dir = Directory.GetCurrentDirectory() + "/wwwroot/Imgs";
                var filePath = Path.Combine(dir, fileName);

                using (var stream = File.Create(filePath))
                {

                    await file.CopyToAsync(stream);
                }
                return true;
            }
            return false;
        }

        private static string GetMD5HashFromFile(MemoryStream ms)
        {
            using (var md5 = MD5.Create())
            {

                return BitConverter.ToString(md5.ComputeHash(ms.ToArray())).Replace("-", string.Empty);

            }
        }
    }
}
