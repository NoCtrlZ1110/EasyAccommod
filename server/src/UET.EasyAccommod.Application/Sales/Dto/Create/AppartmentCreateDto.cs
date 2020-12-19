using System.Collections.Generic;
using UET.EasyAccommod.Sales.Dto.Create.Apartment;

namespace UET.EasyAccommod.Sales.Dto.Create
{
    public class AppartmentCreateDto
    {
        public ApartmentCreateInput Apartment { get; set; }
        public List<ApartmentImageCreateInput> ApartmentImages { get; set; }
        public List<ApartmentPublicPlaceCreateInput> ApartmentPublicPlaces { get; set; }
    }
}
