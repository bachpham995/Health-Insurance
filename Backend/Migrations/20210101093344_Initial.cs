using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthInsuranceWebServer.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    AddressId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Street = table.Column<string>(nullable: true),
                    Districh = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.AddressId);
                });

            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Username = table.Column<string>(maxLength: 50, nullable: false),
                    Password = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FName = table.Column<string>(nullable: true),
                    LName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    JoinDate = table.Column<DateTime>(nullable: false),
                    Designation = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    DoB = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employee_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceCompany",
                columns: table => new
                {
                    InsCompanyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InsCompanyName = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Img = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceCompany", x => x.InsCompanyId);
                    table.ForeignKey(
                        name: "FK_InsuranceCompany_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    FeedbackId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Response = table.Column<string>(nullable: true),
                    EmployeeId1 = table.Column<int>(nullable: true),
                    EmployeeId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.FeedbackId);
                    table.ForeignKey(
                        name: "FK_Feedback_Employee_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Policy",
                columns: table => new
                {
                    PolicyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyNumber = table.Column<string>(maxLength: 15, nullable: true),
                    PolicyName = table.Column<string>(nullable: true),
                    Amount = table.Column<float>(nullable: false),
                    Emi = table.Column<float>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Benefit = table.Column<string>(nullable: true),
                    InsuranceCompanyInsCompanyId = table.Column<int>(nullable: true),
                    InsCompanyId = table.Column<int>(nullable: false),
                    Retired = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Policy", x => x.PolicyId);
                    table.ForeignKey(
                        name: "FK_Policy_InsuranceCompany_InsuranceCompanyInsCompanyId",
                        column: x => x.InsuranceCompanyInsCompanyId,
                        principalTable: "InsuranceCompany",
                        principalColumn: "InsCompanyId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Hospital",
                columns: table => new
                {
                    HospitalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HospitalName = table.Column<string>(nullable: true),
                    Phone = table.Column<string>(nullable: true),
                    Url = table.Column<string>(nullable: true),
                    Img = table.Column<string>(nullable: true),
                    AddressId = table.Column<int>(nullable: false),
                    PolicyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospital", x => x.HospitalId);
                    table.ForeignKey(
                        name: "FK_Hospital_Address_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Address",
                        principalColumn: "AddressId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Hospital_Policy_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "Policy",
                        principalColumn: "PolicyId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PolicyEmployee",
                columns: table => new
                {
                    EmployeeId = table.Column<string>(nullable: false),
                    EmployeeId1 = table.Column<int>(nullable: true),
                    PolicyId = table.Column<int>(nullable: false),
                    Duration = table.Column<int>(nullable: false),
                    EffectiveDate = table.Column<DateTime>(nullable: false),
                    ExpiredDate = table.Column<DateTime>(nullable: false),
                    Amount = table.Column<float>(nullable: false),
                    Emi = table.Column<float>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyEmployee", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_PolicyEmployee_Employee_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PolicyEmployee_Policy_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "Policy",
                        principalColumn: "PolicyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PolicyRequest",
                columns: table => new
                {
                    RequestId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId1 = table.Column<int>(nullable: true),
                    EmployeeId = table.Column<string>(nullable: true),
                    PolicyId = table.Column<int>(nullable: false),
                    RequestDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(nullable: true),
                    Emi = table.Column<float>(nullable: false),
                    Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyRequest", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_PolicyRequest_Employee_EmployeeId1",
                        column: x => x.EmployeeId1,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PolicyRequest_Policy_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "Policy",
                        principalColumn: "PolicyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PolicyApproval",
                columns: table => new
                {
                    ApprovalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ApprovalDate = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false),
                    Reason = table.Column<string>(nullable: true),
                    PolicyRequestRequestId = table.Column<int>(nullable: true),
                    RequestId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyApproval", x => x.ApprovalId);
                    table.ForeignKey(
                        name: "FK_PolicyApproval_PolicyRequest_PolicyRequestRequestId",
                        column: x => x.PolicyRequestRequestId,
                        principalTable: "PolicyRequest",
                        principalColumn: "RequestId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee_AddressId",
                table: "Employee",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_EmployeeId1",
                table: "Feedback",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Hospital_AddressId",
                table: "Hospital",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hospital_PolicyId",
                table: "Hospital",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceCompany_AddressId",
                table: "InsuranceCompany",
                column: "AddressId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Policy_InsuranceCompanyInsCompanyId",
                table: "Policy",
                column: "InsuranceCompanyInsCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyApproval_PolicyRequestRequestId",
                table: "PolicyApproval",
                column: "PolicyRequestRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyEmployee_EmployeeId1",
                table: "PolicyEmployee",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyEmployee_PolicyId",
                table: "PolicyEmployee",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyRequest_EmployeeId1",
                table: "PolicyRequest",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyRequest_PolicyId",
                table: "PolicyRequest",
                column: "PolicyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Hospital");

            migrationBuilder.DropTable(
                name: "PolicyApproval");

            migrationBuilder.DropTable(
                name: "PolicyEmployee");

            migrationBuilder.DropTable(
                name: "PolicyRequest");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Policy");

            migrationBuilder.DropTable(
                name: "InsuranceCompany");

            migrationBuilder.DropTable(
                name: "Address");
        }
    }
}
