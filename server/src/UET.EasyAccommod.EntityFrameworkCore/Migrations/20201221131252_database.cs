using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UET.EasyAccommod.Migrations
{
    public partial class database : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdCard",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApartmentExtension",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    TimeShownId = table.Column<long>(nullable: true),
                    StatusExtension = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentExtension", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstApartmentType",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstApartmentType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstBathroomType",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstBathroomType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstDistrict",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ProvinceId = table.Column<long>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstDistrict", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstKitchenType",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstKitchenType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstProvince",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstProvince", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstSleTimeShown",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    PriceShown = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstSleTimeShown", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstTypePublicPlaceType",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstTypePublicPlaceType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MstUnitPrice",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MstUnitPrice", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OwnerAcount",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Surname = table.Column<string>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    IdCard = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ApproveStatus = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OwnerAcount", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RenterAttention",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    RenterId = table.Column<long>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RenterAttention", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RenterReport",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ReporterId = table.Column<long>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    Detail = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RenterReport", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Apartment",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Detail = table.Column<string>(nullable: true),
                    ProvinceId = table.Column<long>(nullable: true),
                    DistrictId = table.Column<long>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    ApartmentTypeId = table.Column<long>(nullable: true),
                    NumberRoom = table.Column<long>(nullable: true),
                    RoomPrice = table.Column<long>(nullable: true),
                    UnitPriceId = table.Column<long>(nullable: true),
                    RoomArea = table.Column<long>(nullable: true),
                    LiveWithTheOwner = table.Column<bool>(nullable: false),
                    BathroomTypeId = table.Column<long>(nullable: true),
                    KitchenTypeId = table.Column<long>(nullable: true),
                    AirConditional = table.Column<bool>(nullable: false),
                    Balcony = table.Column<bool>(nullable: false),
                    ElectricityPriceType = table.Column<bool>(nullable: false),
                    ElectricityPrice = table.Column<long>(nullable: true),
                    WaterPriceType = table.Column<bool>(nullable: false),
                    WaterPrice = table.Column<long>(nullable: true),
                    OtherUtility = table.Column<string>(nullable: true),
                    UserOwnerId = table.Column<long>(nullable: true),
                    OwnerName = table.Column<string>(nullable: true),
                    OwnerPhone = table.Column<string>(nullable: true),
                    TimeShownId = table.Column<long>(nullable: true),
                    ExpirationDate = table.Column<DateTime>(nullable: true),
                    IsApprove = table.Column<int>(nullable: true),
                    IsEmpty = table.Column<bool>(nullable: true),
                    View = table.Column<long>(nullable: true),
                    Like = table.Column<long>(nullable: true),
                    UserApproverId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apartment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApartmentComment",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    Rate = table.Column<long>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    UserCommentId = table.Column<long>(nullable: true),
                    CommentDetail = table.Column<string>(nullable: true),
                    ParentCommentId = table.Column<long>(nullable: true),
                    Status = table.Column<long>(nullable: true),
                    Like = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentComment", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApartmentImage",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    ImageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentImage", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApartmentLike",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    LikerId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentLike", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApartmentPublicPlace",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    PublicPlaceTypeId = table.Column<long>(nullable: true),
                    Detail = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentPublicPlace", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApartmentRate",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    ApartmentId = table.Column<long>(nullable: true),
                    AssessorId = table.Column<long>(nullable: true),
                    Rate = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApartmentRate", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_ApartmentTypeId",
                table: "Apartment",
                column: "ApartmentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_BathroomTypeId",
                table: "Apartment",
                column: "BathroomTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_DistrictId",
                table: "Apartment",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_KitchenTypeId",
                table: "Apartment",
                column: "KitchenTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_ProvinceId",
                table: "Apartment",
                column: "ProvinceId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_TimeShownId",
                table: "Apartment",
                column: "TimeShownId");

            migrationBuilder.CreateIndex(
                name: "IX_Apartment_UnitPriceId",
                table: "Apartment",
                column: "UnitPriceId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentComment_ApartmentId",
                table: "ApartmentComment",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentImage_ApartmentId",
                table: "ApartmentImage",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentLike_ApartmentId",
                table: "ApartmentLike",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentPublicPlace_ApartmentId",
                table: "ApartmentPublicPlace",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentPublicPlace_PublicPlaceTypeId",
                table: "ApartmentPublicPlace",
                column: "PublicPlaceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ApartmentRate_ApartmentId",
                table: "ApartmentRate",
                column: "ApartmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApartmentComment");

            migrationBuilder.DropTable(
                name: "ApartmentExtension");

            migrationBuilder.DropTable(
                name: "ApartmentImage");

            migrationBuilder.DropTable(
                name: "ApartmentLike");

            migrationBuilder.DropTable(
                name: "ApartmentPublicPlace");

            migrationBuilder.DropTable(
                name: "ApartmentRate");

            migrationBuilder.DropTable(
                name: "OwnerAcount");

            migrationBuilder.DropTable(
                name: "RenterAttention");

            migrationBuilder.DropTable(
                name: "RenterReport");

            migrationBuilder.DropTable(
                name: "MstTypePublicPlaceType");

            migrationBuilder.DropTable(
                name: "Apartment");

            migrationBuilder.DropTable(
                name: "MstApartmentType");

            migrationBuilder.DropTable(
                name: "MstBathroomType");

            migrationBuilder.DropTable(
                name: "MstDistrict");

            migrationBuilder.DropTable(
                name: "MstKitchenType");

            migrationBuilder.DropTable(
                name: "MstProvince");

            migrationBuilder.DropTable(
                name: "MstSleTimeShown");

            migrationBuilder.DropTable(
                name: "MstUnitPrice");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "IdCard",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "AbpUsers");
        }
    }
}
