using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using UET.EasyAccommod.Authorization.Roles;
using UET.EasyAccommod.Authorization.Users;
using UET.EasyAccommod.MultiTenancy;
using UET.EasyAccommod.MasterTable;
using UET.EasyAccommod.Owner;
using UET.EasyAccommod.Sales;

namespace UET.EasyAccommod.EntityFrameworkCore
{
    public class EasyAccommodDbContext : AbpZeroDbContext<Tenant, Role, User, EasyAccommodDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public virtual DbSet<OwnerAcount> OwnerAcounts { set; get; }
        public virtual DbSet<MstApartmentType> MstApartmentTypes { set; get; }
        public virtual DbSet<MstBathroomType> MstBathroomTypes { set; get; }
        public virtual DbSet<MstDistrict> MstDistricts { set; get; }
        public virtual DbSet<MstKitchenType> MstKitchenTypes { set; get; }
        public virtual DbSet<MstProvince> MstProvinces { set; get; }
        public virtual DbSet<MstSleTimeShown> MstSleTimeShowns { set; get; }
        public virtual DbSet<MstTypePublicPlaceType> MstTypePublicPlaceTypes { set; get; }
        public virtual DbSet<MstUnitPrice> MstUnitPrices { set; get; }
        public virtual DbSet<Apartment> Apartments { set; get; }
        public virtual DbSet<ApartmentComment> ApartmentComments { set; get; }
        public virtual DbSet<ApartmentExtension> ApartmentExtensions { set; get; }
        public virtual DbSet<ApartmentImage> ApartmentImages { set; get; }
        public virtual DbSet<ApartmentPublicPlace> ApartmentPublicPlaces { set; get; }
        public virtual DbSet<ApartmentRate> ApartmentRates { set; get; }
        public virtual DbSet<RenterAttention> RenterAttentions { set; get; }
        public virtual DbSet<RenterReport> RenterReports { set; get; }
        public EasyAccommodDbContext(DbContextOptions<EasyAccommodDbContext> options)
            : base(options)
        {
        }
    }
}
