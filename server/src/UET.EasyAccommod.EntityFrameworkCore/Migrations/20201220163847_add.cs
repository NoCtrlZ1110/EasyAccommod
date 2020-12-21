using Microsoft.EntityFrameworkCore.Migrations;

namespace UET.EasyAccommod.Migrations
{
    public partial class add : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApartmentType",
                table: "Apartment");

            migrationBuilder.AddColumn<long>(
                name: "ApartmentTypeId",
                table: "Apartment",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Detail",
                table: "Apartment",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
