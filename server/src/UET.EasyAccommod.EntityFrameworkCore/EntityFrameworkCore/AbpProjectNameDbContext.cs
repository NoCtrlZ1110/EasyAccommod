using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using UET.EasyAccommod.Authorization.Roles;
using UET.EasyAccommod.Authorization.Users;
using UET.EasyAccommod.MultiTenancy;

namespace UET.EasyAccommod.EntityFrameworkCore
{
    public class EasyAccommodDbContext : AbpZeroDbContext<Tenant, Role, User, EasyAccommodDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public EasyAccommodDbContext(DbContextOptions<EasyAccommodDbContext> options)
            : base(options)
        {
        }
    }
}
