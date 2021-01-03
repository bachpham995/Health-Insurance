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
                    District = table.Column<string>(nullable: true),
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

            migrationBuilder.InsertData(
                table: "Address",
                columns: new[] { "AddressId", "City", "Country", "District", "PostalCode", "Street" },
                values: new object[] { 1, "Random City", "Random Country", "Random District", "70000", "Random Street" });

            migrationBuilder.InsertData(
                table: "Policy",
                columns: new[] { "PolicyId", "Amount", "Benefit", "Description", "Emi", "InsCompanyId", "InsuranceCompanyInsCompanyId", "PolicyName", "PolicyNumber", "Retired" },
                values: new object[,]
                {
                    { 1, 3000f, "Random Benefit", "Random Description", 250f, 1, null, "Random Name", "21-00001", false },
                    { 2, 2467f, "Random Benefit", "Random Description", 123f, 1, null, "Random Name", "21-00002", false },
                    { 3, 9876f, "Random Benefit", "Random Description", 222f, 1, null, "Random Name", "21-00003", false },
                    { 4, 2345f, "Random Benefit", "Random Description", 785f, 1, null, "Random Name", "21-00004", false },
                    { 5, 9876f, "Random Benefit", "Random Description", 234f, 1, null, "Random Name", "21-00005", false },
                    { 6, 12345f, "Random Benefit", "Random Description", 111f, 1, null, "Random Name", "21-00006", false },
                    { 7, 123f, "Random Benefit", "Random Description", 222f, 1, null, "Random Name", "21-00007", false },
                    { 8, 987654f, "Random Benefit", "Random Description", 250f, 1, null, "Random Name", "21-00008", false },
                    { 9, 347f, "Random Benefit", "Random Description", 96f, 1, null, "Random Name", "21-00009", false },
                    { 10, 1000f, "Random Benefit", "Random Description", 250f, 1, null, "Random Name", "21-00010", false }
                });

            migrationBuilder.InsertData(
                table: "InsuranceCompany",
                columns: new[] { "InsCompanyId", "AddressId", "Img", "InsCompanyName", "Phone", "Url" },
                values: new object[,]
                {
                    { 1, 1, null, "UnitedHealth Group Incorporated", "1234-5678-1011", null },
                    { 2, 1, null, "AXA S.A.", "1234-5678-1011", null },
                    { 3, 1, null, "China Life Insurance (Group) Company", "1234-5678-1011", null },
                    { 4, 1, null, "Ping An Insurance (Group) Company of China Ltd", "1234-5678-1011", null },
                    { 5, 1, null, "Allianz SE", "1234-5678-1011", null },
                    { 6, 1, null, "Anthem, Inc.", "1234-5678-1011", null },
                    { 7, 1, null, "Kaiser Foundation Group of Health Plans", "1234-5678-1011", null },
                    { 8, 1, null, "Assicurazioni Generali S.p.A", "1234-5678-1011", null },
                    { 9, 1, null, "State Farm Group", "1234-5678-1011", null },
                    { 10, 1, null, "People’s Insurance Company (Group) of China Ltd", "1234-5678-1011", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employee_AddressId",
                table: "Employee",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_EmployeeId1",
                table: "Feedback",
                column: "EmployeeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Hospital_AddressId",
                table: "Hospital",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Hospital_PolicyId",
                table: "Hospital",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceCompany_AddressId",
                table: "InsuranceCompany",
                column: "AddressId");

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
