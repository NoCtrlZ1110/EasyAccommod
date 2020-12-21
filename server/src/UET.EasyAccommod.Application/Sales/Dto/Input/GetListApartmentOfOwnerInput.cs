using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.Sales.Dto.Input
{
    public class GetListApartmentOfOwnerInput
    {
        public string Title { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public long? Status { get; set; }
        // 1 - Approving
        // 2 - Active
        // 3 - Expired
        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
    }
}
