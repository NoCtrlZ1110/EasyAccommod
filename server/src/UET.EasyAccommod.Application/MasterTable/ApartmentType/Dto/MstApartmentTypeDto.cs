using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.MasterTable.ApartmentType.Dto
{
    public class MstApartmentTypeDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

