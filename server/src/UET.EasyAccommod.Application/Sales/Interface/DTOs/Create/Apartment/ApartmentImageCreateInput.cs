using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UET.EasyAccommod.Sales.Interface.DTOs.Create.Apartment
{
    public class ApartmentImageCreateInput : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public string ImageUrl { get; set; }
    }
}
