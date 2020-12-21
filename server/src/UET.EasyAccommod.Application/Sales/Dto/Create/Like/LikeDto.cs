using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace UET.EasyAccommod.Sales.Dto.Create.Like
{
    public class LikeDto : EntityDto<long>
    {
        public long? ApartmentId { get; set; }
        public long? LikerId { get; set; }
    }
}
