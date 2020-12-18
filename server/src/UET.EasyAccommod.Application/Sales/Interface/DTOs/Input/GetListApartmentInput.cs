using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UET.EasyAccommod.Sales.Interface.DTOs.Input
{
    public class GetListApartmentInput
    {
        public string Filter { get; set; }
        public int SkipCount { get; set; }
        public int MaxResultCount { get; set; }
    }
}
