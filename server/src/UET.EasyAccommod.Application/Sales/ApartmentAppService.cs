using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web.Http;
using UET.EasyAccommod.Helpers;
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
            return (long)_apartmentRepo.InsertAndGetId(appartment);
        }
        private long EditAppartment(ApartmentCreateInput input)
        {
            var apartment = _apartmentRepo.FirstOrDefault(input.Id);
            ObjectMapper.Map(input, apartment);
            return (long)apartment.Id;
        }
        public async Task<ApartmentDetailDto> GetApartmentDetail(ApartmentDetailInput input)
        {
            var apartment = await _apartmentRepo.GetAll()
                                                .Include(a => a.ApartmentType)
                                                .Include(a => a.BathroomType)
                                                .Include(a => a.District)
                                                .Include(a => a.Province)
                                                .Include(a => a.KitchenType)
                                                .Include(a => a.TimeShown)
                                                .Include(a => a.ApartmentImages)
                                                .Include(a => a.ApartmentRates)
                                                .Include(a => a.ApartmentComments)
                                                .Include(a => a.ApartmentPublicPlaces)
                                                .ThenInclude(ap => ap.PublicPlaceType)
                                                .Include(a => a.UnitPrice)
                                                .FirstOrDefaultAsync(a => a.Id == input.ApartmentId);
            return ObjectMapper.Map<ApartmentDetailDto>(apartment);
        }

        public PagedResultDto<ApartmentListDto> GetListAppartment(GetListApartmentInput input)
        {
            var listApartment = _apartmentRepo
                .GetAll()
                .Include(a => a.Province)
                .Include(a => a.District)
                .Include(a => a.ApartmentType)
                .Include(a => a.UnitPrice)
                .AsEnumerable()
                .Where(a => a.IsApprove == 1 && DateTime.Compare((DateTime)a.ExpirationDate, DateTime.Now) >= 0)
                .Where(a => StringHelper.ConvertToUnsign(a.Title).Contains(StringHelper.ConvertToUnsign(input.Title))
                || (a.UnitPriceId == input.UnitPriceId && input.PriceFrom <= a.RoomPrice && a.RoomPrice <= input.PriceTo)
                || (input.AreaFrom <= a.RoomArea && a.RoomArea <= input.AreaTo)
                || (input.ProvinceId == a.ProvinceId)
                || (input.DistrictId == a.DistrictId)
                || (input.ApartmentTypeId == a.ApartmentTypeId)
                || (input.StayWithOwner == a.LiveWithTheOwner))
                .OrderBy(a => a.CreationTime);
            var totalcount = listApartment.Count();
            var res = listApartment.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            return new PagedResultDto<ApartmentListDto>(
                totalcount,
                ObjectMapper.Map<List<ApartmentListDto>>(res)
                );
        }

        public PagedResultDto<ApartmentListDto> GetListAppartmentOfOwner(GetListApartmentOfOwnerInput input)
        {
            var listApartment = _apartmentRepo
                .GetAll()
                .Include(a => a.Province)
                .Include(a => a.District)
                .Include(a => a.ApartmentType)
                .Include(a => a.UnitPrice)
                .AsEnumerable()
                .Where(a => StringHelper.ConvertToUnsign(a.Title).Contains(StringHelper.ConvertToUnsign(input.Title))
                || (DateTime.Compare((DateTime)input.DateFrom, a.CreationTime) <= 0 && DateTime.Compare(a.CreationTime, (DateTime)input.DateTo) <= 0)
                 );
            // 1 - Approving
            // 2 - Active
            // 3 - Expired
            switch (input.Status)
            {
                case 1:
                    listApartment = listApartment.Where(a => a.IsApprove != 1).OrderBy(a => a.CreationTime);
                    break;
                case 2:
                    listApartment = listApartment.Where(a => a.IsApprove == 1).OrderBy(a => a.CreationTime);
                    break;
                case 3:
                    listApartment = listApartment.Where(a => a.IsApprove == 1 && DateTime.Compare((DateTime)a.ExpirationDate, DateTime.Now) < 0).OrderBy(a => a.CreationTime);
                    break;
                default:
                    listApartment = listApartment.OrderBy(a => a.CreationTime);
                    break;
            }
            var totalcount = listApartment == null ? 0 : listApartment.Count();
            var res = listApartment.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            return new PagedResultDto<ApartmentListDto>(
                totalcount,
                ObjectMapper.Map<List<ApartmentListDto>>(res)
                );
        }
        public async Task<List<ApartmentImageCreateInput>> UploadImageDelivery([FromForm] ImageInput input)
        {
            List<ApartmentImageCreateInput> url = new List<ApartmentImageCreateInput>();
            //var imagesSize = input.Images.Sum(f => f.Length);
            if (input == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent(string.Format("No Image"))

                };

                throw new HttpResponseException(response);
            }
            //foreach (var image in input.Images)
            //{
            var file = input.Images;
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

                throw new System.Web.Http.HttpResponseException(response);
            }
            //}
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
