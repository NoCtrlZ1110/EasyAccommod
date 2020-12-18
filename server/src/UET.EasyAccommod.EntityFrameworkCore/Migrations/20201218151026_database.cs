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
                name: "IdCard",
                table: "AbpUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "AbpUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
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
