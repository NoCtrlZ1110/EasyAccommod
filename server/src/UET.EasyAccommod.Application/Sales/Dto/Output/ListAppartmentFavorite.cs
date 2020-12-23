using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.Sales.Dto.Output
{
    public class ListAppartmentFavorite : EntityDto<long>
    {
        public long? RenterId { get; set; }
        public long? ApartmentId { get; set; }
        public ApartmentDetailDto Apartment { get; set; }
    }
}
