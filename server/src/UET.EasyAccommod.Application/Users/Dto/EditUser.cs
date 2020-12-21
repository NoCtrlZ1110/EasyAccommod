using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UET.EasyAccommod.Users.Dto
{
    public class EditUser : EntityDto<long>
    {
        // [Required]
        // [StringLength(AbpUserBase.MaxUserNameLength)]
        public string UserName { get; set; }

        // [Required]
        // [StringLength(AbpUserBase.MaxNameLength)]
        public string Name { get; set; }

        // [Required]
        // [StringLength(AbpUserBase.MaxSurnameLength)]
        public string Surname { get; set; }

        // [Required]
        [EmailAddress]
        // [StringLength(AbpUserBase.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        public bool IsActive { get; set; }

        public string FullName { get; set; }
        // [Required]
        public string IdCard { get; set; }
        //  [Required]
        public string Address { get; set; }
        public string Phone { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public DateTime CreationTime { get; set; }

    }
}
