using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UET.EasyAccommod.Sales.Dto.Input
{
    public class GetListApartmentInput
    {
        public string Title { get; set; }
        public long? ProvinceId { get; set; }
        public long? DistrictId { get; set; }
        public long? ApartmentTypeId { get; set; }
        public bool StayWithOwner { get; set; }
        public long? UnitPriceId { get; set; }
        public long? PriceFrom { get; set; }
        public long? PriceTo { get; set; }
        public long? AreaFrom { get; set; }
        public long? AreaTo { get; set; }
        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
    }
}
