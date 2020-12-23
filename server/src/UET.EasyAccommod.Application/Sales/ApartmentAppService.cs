using Abp.Application.Services.Dto;
using Abp.Authorization;
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
using UET.EasyAccommod.Authorization.Users;
using UET.EasyAccommod.Helpers;
using UET.EasyAccommod.Sales.Dto.Create;
using UET.EasyAccommod.Sales.Dto.Create.Apartment;
using UET.EasyAccommod.Sales.Dto.Create.Comment;
using UET.EasyAccommod.Sales.Dto.Create.Image;
using UET.EasyAccommod.Sales.Dto.Create.Like;
using UET.EasyAccommod.Sales.Dto.Create.Rate;
using UET.EasyAccommod.Sales.Dto.Create.Renter;
using UET.EasyAccommod.Sales.Dto.Input;
using UET.EasyAccommod.Sales.Dto.Output;
using UET.EasyAccommod.Sales.Dto.Output.IncludeDto;

namespace UET.EasyAccommod.Sales
{
    public class ApartmentAppService : EasyAccommodAppServiceBase, IApartmentAppService
    {
        private readonly IRepository<Apartment, long> _apartmentRepo;
        private readonly IRepository<ApartmentImage, long> _apartmentImageRepo;
        private readonly IRepository<ApartmentPublicPlace, long> _apartmentPublicPlaceRepo;
        private readonly IRepository<ApartmentComment, long> _apartmentCommentRepo;
        private readonly IRepository<ApartmentRate, long> _apartmentRateRepo;
        private readonly IRepository<ApartmentLike, long> _apartmentLikeRepo;
        private readonly IRepository<RenterAttention, long> _renterAttentionRepo;
        private readonly IRepository<User, long> _userRepo;

        public ApartmentAppService(IRepository<Apartment, long> apartmentRepo,
                                   IRepository<ApartmentImage, long> apartmentImageRepo,
                                   IRepository<ApartmentPublicPlace, long> apartmentPublicPlaceRepo,
                                   IRepository<ApartmentComment, long> apartmentCommentRepo,
                                   IRepository<ApartmentRate, long> apartmentRateRepo,
                                   IRepository<ApartmentLike, long> apartmentLikeRepo,
                                    IRepository<RenterAttention, long> renterAttentionRepo,
                                    IRepository<User, long> userRepo)
        {
            _apartmentRepo = apartmentRepo;
            _apartmentImageRepo = apartmentImageRepo;
            _apartmentPublicPlaceRepo = apartmentPublicPlaceRepo;
            _apartmentCommentRepo = apartmentCommentRepo;
            _apartmentRateRepo = apartmentRateRepo;
            _apartmentLikeRepo = apartmentLikeRepo;
            _renterAttentionRepo = renterAttentionRepo;
            _userRepo = userRepo;
        }

        [AbpAuthorize]
        public async Task CreateOrEditApartment(AppartmentCreateDto input)
        {
            var apartment = input.Apartment;
            long apartmentId;
            if (apartment.Id == 0)
            {
                apartment.IsApprove = 0;
                apartment.UserOwnerId = AbpSession.UserId;
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
            if (AbpSession.UserId != apartment.UserOwnerId)
            {
                apartment.View++;
                await _apartmentRepo.UpdateAsync(apartment);
            }
            return ObjectMapper.Map<ApartmentDetailDto>(apartment);
        }
        [AbpAuthorize]
        public bool CheckLike(LikeDto input)
        {
            var al = _apartmentLikeRepo.GetAll()
                .Where(a => a.ApartmentId == input.ApartmentId)
                .Where(l => l.LikerId == AbpSession.UserId);
            return al.Count() != 0;
        }
        [AbpAuthorize]
        public async Task ApproveNews(ApproveNewsInput input)
        {
            try
            {
                var apartment = await _apartmentRepo.GetAll().Include(a => a.TimeShown).FirstOrDefaultAsync(a => a.Id == input.apartmentId);
                apartment.IsApprove = (int?)input.status;
                switch (input.status)
                {
                    case 1:
                        apartment.ExpirationDate = DateTime.Now.AddDays(Int32.Parse(apartment.TimeShown.Description));
                        break;
                    default:
                        break;
                }
                await _apartmentRepo.UpdateAsync(apartment);
            }
            catch
            {
                throw new Exception();
            }
        }
        [AbpAuthorize]
        public async Task LikeNewsApartment(LikeDto input)
        {
            var isLike = await _apartmentLikeRepo.GetAll().Where(a => a.LikerId == input.LikerId).ToListAsync();
            if (isLike.Count() == 0)
            {
                var apartment = await _apartmentRepo.FirstOrDefaultAsync((long)input.ApartmentId);
                if (apartment.Like == null) apartment.Like = 0;
                apartment.Like++;
                await _apartmentRepo.UpdateAsync(apartment);
                input.LikerId = AbpSession.UserId;
                await _apartmentLikeRepo.InsertAsync(ObjectMapper.Map<ApartmentLike>(input));
            }
        }
        [AbpAuthorize]
        public async Task DisLikeNewsApartment(LikeDto input)
        {
            var isLike = await _apartmentLikeRepo.GetAll().Where(a => a.LikerId == input.LikerId).ToListAsync();
            if (isLike.Count() != 0)
            {
                var apartment = await _apartmentRepo.FirstOrDefaultAsync((long)input.ApartmentId);
                if (apartment.Like == null) apartment.Like = 0;
                apartment.Like--;
                await _apartmentRepo.UpdateAsync(apartment);
                foreach (var a in isLike.ToList())
                {
                    await _apartmentLikeRepo.DeleteAsync(a.Id);
                }
            }
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
                .Where(a => a.IsApprove == 1 && DateTime.Compare((DateTime)(a.ExpirationDate != null ? a.ExpirationDate : DateTime.Now.AddDays(-1)), DateTime.Now) >= 0)
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
        [AbpAuthorize]
        public PagedResultDto<ApartmentListDto> GetListAppartmentOfOwner(GetListApartmentOfOwnerInput input)
        {
            var listApartment = _apartmentRepo
                .GetAll()
                .Where(a => a.UserOwnerId == AbpSession.UserId)
                .Include(a => a.Province)
                .Include(a => a.District)
                .Include(a => a.ApartmentType)
                .Include(a => a.UnitPrice)
                .AsEnumerable()
                .Where(a => StringHelper.ConvertToUnsign(a.Title).Contains(StringHelper.ConvertToUnsign(input.Title))
                || (input.DateFrom != null && (DateTime.Compare((DateTime)input.DateFrom, a.CreationTime) <= 0 && DateTime.Compare(a.CreationTime, (DateTime)input.DateTo) <= 0))
                 );
            // 1 - Approving
            // 2 - Active
            // 3 - Expired
            listApartment = input.Status switch
            {
                1 => listApartment.Where(a => a.IsApprove != 1).OrderBy(a => a.CreationTime),
                2 => listApartment.Where(a => a.IsApprove == 1).OrderBy(a => a.CreationTime),
                3 => listApartment.Where(a => a.IsApprove == 1 && DateTime.Compare((DateTime)(a.ExpirationDate != null ? a.ExpirationDate : DateTime.Now.AddDays(-1)), DateTime.Now) < 0).OrderBy(a => a.CreationTime),
                _ => listApartment.OrderBy(a => a.CreationTime),
            };
            var totalcount = listApartment == null ? 0 : listApartment.Count();
            var res = listApartment.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            return new PagedResultDto<ApartmentListDto>(
                totalcount,
                ObjectMapper.Map<List<ApartmentListDto>>(res)
                );
        }
        [AbpAuthorize]
        public async Task MarkIsRented(bool status, long apartmentId)
        {
            var apartment = await _apartmentRepo.FirstOrDefaultAsync(apartmentId);
            apartment.IsEmpty = status;
            _apartmentRepo.Update(apartment);
        }
        [AbpAuthorize]
        public async Task<long> MarkIsFavorite(RenterFavoriteCreateDto input)
        {
            if (input.Id == 0)
            {
                var ar = await _renterAttentionRepo.GetAll().Where(r => r.RenterId == input.RenterId).ToListAsync();
                if (ar.Count > 0)
                {
                    return 0;
                }
                else
                {
                    var apartmentFavorite = ObjectMapper.Map<RenterAttention>(input);
                    await _renterAttentionRepo.InsertAsync(apartmentFavorite);
                    return 1;
                }
            }
            else
            {
                await _renterAttentionRepo.DeleteAsync(input.Id);
                return 1;
            }
        }
        public PagedResultDto<ListAppartmentFavorite> GetListApartmentFavorite(GetListApartmentFavoriteInput input)
        {
            var listApartmentFavorite = _renterAttentionRepo.GetAll()
                                                           .Where(a => a.RenterId == AbpSession.UserId)
                                                           .Include(a => a.Apartment)
                                                           .ThenInclude(ap => ap.ApartmentImages)
                                                           .Where(a => a.Apartment.IsApprove == 1 && DateTime.Compare((DateTime)(a.Apartment.ExpirationDate != null ? a.Apartment.ExpirationDate : DateTime.Now.AddDays(-1)), DateTime.Now) >= 0)
                                                           .OrderBy(a => a.CreationTime);
            var totalCount = listApartmentFavorite.Count();
            var res = listApartmentFavorite.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();

            return new PagedResultDto<ListAppartmentFavorite>(
                totalCount,
                ObjectMapper.Map<List<ListAppartmentFavorite>>(res));
        }
        [AbpAuthorize]
        public PagedResultDto<ApartmentListDto> GetListAppartmentOfAdmin(GetListApartmentOfOwnerInput input)
        {
            var listApartment = _apartmentRepo
                .GetAll()
                .Include(a => a.Province)
                .Include(a => a.District)
                .Include(a => a.ApartmentType)
                .Include(a => a.UnitPrice)
                .AsEnumerable()
                .Where(a => StringHelper.ConvertToUnsign(a.Title).Contains(StringHelper.ConvertToUnsign(input.Title))
                || (input.DateFrom != null && DateTime.Compare((DateTime)input.DateFrom, a.CreationTime) <= 0 && DateTime.Compare(a.CreationTime, (DateTime)input.DateTo) <= 0)
                 );
            // 1 - Approving
            // 2 - Active
            // 3 - Expired
            listApartment = input.Status switch
            {
                1 => listApartment.Where(a => a.IsApprove == 0).OrderBy(a => a.CreationTime),
                2 => listApartment.Where(a => a.IsApprove == 1).OrderBy(a => a.CreationTime),
                3 => listApartment.Where(a => a.IsApprove == 1 && DateTime.Compare((DateTime)a.ExpirationDate, DateTime.Now) < 0).OrderBy(a => a.CreationTime),
                _ => listApartment.OrderBy(a => a.CreationTime),
            };
            var totalcount = listApartment == null ? 0 : listApartment.Count();
            var res = listApartment.Skip(input.SkipCount).Take(input.MaxResultCount).ToList();
            return new PagedResultDto<ApartmentListDto>(
                totalcount,
                ObjectMapper.Map<List<ApartmentListDto>>(res)
                );
        }
        public PagedResultDto<ApartmentCommentDto> GetListComment(long apartmentId, int SkipCount, int MaxResultCount)
        {
            var ListComment = _apartmentCommentRepo.GetAll().Where(c => c.ApartmentId == apartmentId).OrderByDescending(a => a.CreationTime);
            var total = ListComment.Count();
            var res = ListComment.Skip(SkipCount).Take(MaxResultCount).ToList();
            return new PagedResultDto<ApartmentCommentDto>(
                total,
                ObjectMapper.Map<List<ApartmentCommentDto>>(res)
                );
        }
        [AbpAuthorize]
        public async Task CreateOrEditNewsComment(ApartmentCommentCreateDto input)
        {
            input.UserCommentId = AbpSession.UserId;
            if (input.Id == 0)
            {
                var comment = ObjectMapper.Map<ApartmentComment>(input);
                await _apartmentCommentRepo.InsertAsync(comment);
            }
            else
            {
                var comment = await _apartmentCommentRepo.FirstOrDefaultAsync(input.Id);
                ObjectMapper.Map(input, comment);
            }
        }
        [AbpAuthorize]
        public async Task SendNewsRate(ApartmentRateCreateDto input)
        {
            input.AssessorId = AbpSession.UserId;
            if (input.Id == 0)
            {
                var rate = ObjectMapper.Map<ApartmentRate>(input);
                await _apartmentRateRepo.InsertAsync(rate);
            }
            else
            {
                var rate = await _apartmentRateRepo.FirstOrDefaultAsync(input.Id);
                ObjectMapper.Map(input, rate);
            }
        }
        [AbpAuthorize]
        public async Task DeleteNewsComment(long commentId)
        {
            await _apartmentCommentRepo.DeleteAsync(commentId);
        }
        [AbpAuthorize]
        public async Task DeleteNewsApartment(long apartmentId)
        {
            await _apartmentRepo.DeleteAsync(apartmentId);
            await _apartmentCommentRepo.DeleteAsync(a => a.ApartmentId == apartmentId);
            await _apartmentImageRepo.DeleteAsync(a => a.ApartmentId == apartmentId);
            await _apartmentLikeRepo.DeleteAsync(a => a.ApartmentId == apartmentId);
            await _apartmentPublicPlaceRepo.DeleteAsync(a => a.ApartmentId == apartmentId);
            await _apartmentRateRepo.DeleteAsync(a => a.ApartmentId == apartmentId);
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
        public async Task<List<ApartmentImageCreateInput>> UploadListImage([FromForm] ImageListInput input)
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

                    throw new System.Web.Http.HttpResponseException(response);
                }
            }
            return url;
        }
        public DashboardOutput GetDashboard()
        {
            DashboardOutput output = new DashboardOutput();

            output.TotalUser = _userRepo.GetAll().Count();
            output.TotalNewUser = _userRepo.GetAll().Where(u => u.IsActive == false).Count();
            output.TotalNews = _apartmentRepo.GetAll().Count();
            output.TotalNewNews = _apartmentRepo.GetAll().Where(a => a.IsApprove == 0).Count();
            return output;
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

    public class DashboardOutput
    {
        public long TotalUser { get; set; }
        public long TotalNewUser { get; set; }
        public long TotalNews { get; set; }
        public long TotalNewNews { get; set; }
    }

    public class ApproveNewsInput
    {
        public long apartmentId { get; set; }
        public int status { get; set; }
    }
}
