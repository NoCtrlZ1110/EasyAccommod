using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.Sales.Dto.Create.Renter
{
    public class RenterFavoriteCreateDto : EntityDto<long>
    {
        public long? RenterId { get; set; }
        public long? ApartmentId { get; set; }
    }
}
