using System.Collections.Generic;
using UET.EasyAccommod.Sales.Interface.DTOs.Create.Apartment;

namespace UET.EasyAccommod.Sales.Interface.DTOs.Create
{
    public class AppartmentCreateDto
    {
        public ApartmentCreateInput Apartment { get; set; }
        public List<ApartmentImageCreateInput> ApartmentImages { get; set; }
        public List<ApartmentPublicPlaceCreateInput> ApartmentPublicPlaces { get; set; }
    }
}
