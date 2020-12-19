using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UET.EasyAccommod.Sales.Dto.Create.Apartment
{
    public class ApartmentPublicPlaceCreateInput : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public long? PublicPlaceTypeId { get; set; }
        public string Detail { get; set; }
    }
}
