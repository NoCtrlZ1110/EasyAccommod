using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.MasterTable.KitchenType.Dto
{
    public class MstKitchenTypeDto : EntityDto<long>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
