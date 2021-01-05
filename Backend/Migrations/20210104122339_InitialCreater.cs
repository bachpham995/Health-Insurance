﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthInsuranceWebServer.Migrations
{
    public partial class InitialCreater : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Username = table.Column<string>(maxLength: 255, nullable: false),
                    Password = table.Column<string>(maxLength: 255, nullable: true)
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
                    FName = table.Column<string>(maxLength: 50, nullable: false),
                    LName = table.Column<string>(maxLength: 50, nullable: false),
                    Username = table.Column<string>(maxLength: 50, nullable: false),
                    Password = table.Column<string>(maxLength: 255, nullable: false),
                    JoinDate = table.Column<DateTime>(nullable: false),
                    Designation = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    Phone = table.Column<string>(maxLength: 20, nullable: true),
                    Address_Street = table.Column<string>(maxLength: 255, nullable: true),
                    Address_District = table.Column<string>(maxLength: 50, nullable: true),
                    Address_City = table.Column<string>(maxLength: 50, nullable: true),
                    Address_Country = table.Column<string>(maxLength: 50, nullable: true),
                    Address_PostalCode = table.Column<string>(maxLength: 10, nullable: true),
                    DoB = table.Column<DateTime>(nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    Retired = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Hospital",
                columns: table => new
                {
                    HospitalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HospitalName = table.Column<string>(maxLength: 255, nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: true),
                    Url = table.Column<string>(maxLength: 255, nullable: true),
                    Img = table.Column<string>(maxLength: 255, nullable: true),
                    Address_Street = table.Column<string>(maxLength: 255, nullable: true),
                    Address_District = table.Column<string>(maxLength: 50, nullable: true),
                    Address_City = table.Column<string>(maxLength: 50, nullable: true),
                    Address_Country = table.Column<string>(maxLength: 50, nullable: true),
                    Address_PostalCode = table.Column<string>(maxLength: 10, nullable: true),
                    Retired = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospital", x => x.HospitalId);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceCompany",
                columns: table => new
                {
                    InsCompanyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InsCompanyName = table.Column<string>(maxLength: 255, nullable: false),
                    Phone = table.Column<string>(maxLength: 20, nullable: true),
                    Url = table.Column<string>(maxLength: 255, nullable: true),
                    Img = table.Column<string>(maxLength: 255, nullable: true),
                    Address_Street = table.Column<string>(maxLength: 255, nullable: true),
                    Address_District = table.Column<string>(maxLength: 50, nullable: true),
                    Address_City = table.Column<string>(maxLength: 50, nullable: true),
                    Address_Country = table.Column<string>(maxLength: 50, nullable: true),
                    Address_PostalCode = table.Column<string>(maxLength: 10, nullable: true),
                    Retired = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceCompany", x => x.InsCompanyId);
                });

            migrationBuilder.CreateTable(
                name: "Feedback",
                columns: table => new
                {
                    FeedbackId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(maxLength: 255, nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Response = table.Column<string>(type: "text", nullable: true),
                    Retired = table.Column<bool>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedback", x => x.FeedbackId);
                    table.ForeignKey(
                        name: "FK_Feedback_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notification",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(nullable: false),
                    AdminId = table.Column<string>(nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Status = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notification_Admin_AdminId",
                        column: x => x.AdminId,
                        principalTable: "Admin",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Notification_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Policy",
                columns: table => new
                {
                    PolicyId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyNumber = table.Column<string>(maxLength: 15, nullable: false),
                    PolicyName = table.Column<string>(maxLength: 255, nullable: false),
                    Amount = table.Column<float>(nullable: false),
                    Emi = table.Column<float>(nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Benefit = table.Column<string>(maxLength: 255, nullable: false),
                    Retired = table.Column<bool>(nullable: false),
                    InsCompanyId = table.Column<int>(nullable: false),
                    HospitalId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Policy", x => x.PolicyId);
                    table.ForeignKey(
                        name: "FK_Policy_Hospital_HospitalId",
                        column: x => x.HospitalId,
                        principalTable: "Hospital",
                        principalColumn: "HospitalId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Policy_InsuranceCompany_InsCompanyId",
                        column: x => x.InsCompanyId,
                        principalTable: "InsuranceCompany",
                        principalColumn: "InsCompanyId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PolicyEmployee",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeId = table.Column<int>(nullable: false),
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
                    table.PrimaryKey("PK_PolicyEmployee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PolicyEmployee_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
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
                    EmployeeId = table.Column<int>(nullable: false),
                    PolicyId = table.Column<int>(nullable: false),
                    RequestDate = table.Column<byte[]>(rowVersion: true, nullable: true),
                    Status = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(maxLength: 255, nullable: true),
                    Emi = table.Column<float>(nullable: false),
                    Amount = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyRequest", x => x.RequestId);
                    table.ForeignKey(
                        name: "FK_PolicyRequest_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
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
                    Reason = table.Column<string>(nullable: false),
                    RequestId = table.Column<int>(nullable: false),
                    Retired = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyApproval", x => x.ApprovalId);
                    table.ForeignKey(
                        name: "FK_PolicyApproval_PolicyRequest_RequestId",
                        column: x => x.RequestId,
                        principalTable: "PolicyRequest",
                        principalColumn: "RequestId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Admin",
                columns: new[] { "Username", "Password" },
                values: new object[] { "Admin", "123456789" });

            migrationBuilder.InsertData(
                table: "Employee",
                columns: new[] { "EmployeeId", "Designation", "DoB", "Email", "FName", "JoinDate", "LName", "Password", "Phone", "Retired", "Status", "Username" },
                values: new object[,]
                {
                    { 1, "Senior Cleaner", new DateTime(1996, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "phatltuit@gmail.com", "Phat", new DateTime(2031, 1, 4, 19, 23, 39, 202, DateTimeKind.Local).AddTicks(9350), "Luu Trong", "123", "058256332X", false, false, "phatltuit" },
                    { 2, "Junior Cleaner", new DateTime(1996, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "bachpham@gmail.com", "Bach", new DateTime(2031, 1, 4, 19, 23, 39, 216, DateTimeKind.Local).AddTicks(3340), "Pham Xuan", "123456789", "012345678X", false, false, "bachpham" },
                    { 3, "Junior Cleaner", new DateTime(1996, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), "nguyenvuhoanghoa@gmail.com", "Hoa", new DateTime(2031, 1, 4, 19, 23, 39, 216, DateTimeKind.Local).AddTicks(3380), "Nguyen Vu Hoang", "123456789", "01232278X", false, false, "nguyenvuhoanghoa" }
                });

            migrationBuilder.InsertData(
                table: "Hospital",
                columns: new[] { "HospitalId", "HospitalName", "Img", "Phone", "Retired", "Url" },
                values: new object[,]
                {
                    { 10, "Bệnh Viện Đa Khoa Hồng Đức", null, "08-3996-9999", false, null },
                    { 9, "Bệnh viện Đa Khoa Hoàn Mỹ", null, "08-3990-2468", false, null },
                    { 7, "Bệnh viện Nhi Đồng 2", null, "08-3829-8385", false, null },
                    { 6, "Bệnh viện Mắt TP HCM", null, "08-3932-6732", false, null },
                    { 8, "Bệnh viện Đa Khoa Vạn Hạnh", null, "08-3863-1272", false, null },
                    { 4, "Bệnh viện Bình Dân", null, "08-3839-4747", false, null },
                    { 3, "Bệnh viện Y Học Cổ Truyển", null, "08-3932-6004", false, null },
                    { 2, "Bệnh viện Đại học Y Dược TP HCM", null, "08-3855-4269", false, null },
                    { 1, "Bệnh viện Nhân Dân Gia Định", null, "08-3841-2692", false, null },
                    { 5, "Bệnh viện Tai Mũi Họng TP HCM", null, "08-3931-7381", false, null }
                });

            migrationBuilder.InsertData(
                table: "InsuranceCompany",
                columns: new[] { "InsCompanyId", "Img", "InsCompanyName", "Phone", "Retired", "Url" },
                values: new object[,]
                {
                    { 9, null, "Công ty TNHH Bảo hiểm Hanwha Life", "028-3914-9100", false, "https://www.hanwhalife.com.vn/" },
                    { 1, null, "Công ty Bảo Việt Nhân Thọ", "028-39-101-660", false, "https://www.baovietnhantho.com.vn/" },
                    { 2, null, "Công ty TNHH bảo hiểm nhân thọ Prudential", "(028)-39-101-660", false, "https://www.prudential.com.vn/" },
                    { 3, null, "Công ty TNHH Manulife", "1234-5678-1011", false, "https://www.manulife.com.vn/" },
                    { 4, null, "Công ty TNHH Bảo hiểm Nhân thọ Dai-ichi", "028-3810-0888", false, "https://dai-ichi-life.com.vn/" },
                    { 5, null, "Công ty TNHH bảo hiểm nhân thọ AIA", "028-3812-2777", false, "https://www.aia.com.vn/" },
                    { 6, null, "Công ty TNHH Bảo hiểm Nhân thọ Sun Life", "028-629-85-888", false, "https://www.sunlife.com.vn/" },
                    { 7, null, "Công ty TNHH bảo hiểm nhân thọ Generali", "1234-5678-1011", false, "https://www.generali-life.com.vn/" },
                    { 8, null, "Công ty TNHH Bảo hiểm Nhân thọ Chubb", "028-3827-8989", false, "https://www.chubb.com/" },
                    { 10, null, "Công ty TNHH bảo hiểm nhân thọ Aviva", "1900-633-369", false, "https://www.aviva.com.vn/" }
                });

            migrationBuilder.InsertData(
                table: "Policy",
                columns: new[] { "PolicyId", "Amount", "Benefit", "Description", "Emi", "HospitalId", "InsCompanyId", "PolicyName", "PolicyNumber", "Retired" },
                values: new object[,]
                {
                    { 1, 3000f, "Random Benefit", "Random Description", 250f, 1, 1, "Random Name", "21-00001", false },
                    { 2, 2467f, "Random Benefit", "Random Description", 123f, 2, 1, "Random Name", "21-00002", false },
                    { 3, 9876f, "Random Benefit", "Random Description", 222f, 3, 1, "Random Name", "21-00003", false },
                    { 4, 2345f, "Random Benefit", "Random Description", 785f, 4, 1, "Random Name", "21-00004", false },
                    { 5, 9876f, "Random Benefit", "Random Description", 234f, 5, 1, "Random Name", "21-00005", false },
                    { 6, 12345f, "Random Benefit", "Random Description", 111f, 6, 1, "Random Name", "21-00006", false },
                    { 7, 123f, "Random Benefit", "Random Description", 222f, 7, 1, "Random Name", "21-00007", false },
                    { 8, 987654f, "Random Benefit", "Random Description", 250f, 8, 1, "Random Name", "21-00008", false },
                    { 9, 347f, "Random Benefit", "Random Description", 96f, 9, 1, "Random Name", "21-00009", false },
                    { 10, 1000f, "Random Benefit", "Random Description", 250f, 10, 1, "Random Name", "21-00010", false }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Feedback_EmployeeId",
                table: "Feedback",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_AdminId",
                table: "Notification",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_Notification_EmployeeId",
                table: "Notification",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Policy_HospitalId",
                table: "Policy",
                column: "HospitalId");

            migrationBuilder.CreateIndex(
                name: "IX_Policy_InsCompanyId",
                table: "Policy",
                column: "InsCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyApproval_RequestId",
                table: "PolicyApproval",
                column: "RequestId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyEmployee_EmployeeId",
                table: "PolicyEmployee",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyEmployee_PolicyId",
                table: "PolicyEmployee",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyRequest_EmployeeId",
                table: "PolicyRequest",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyRequest_PolicyId",
                table: "PolicyRequest",
                column: "PolicyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedback");

            migrationBuilder.DropTable(
                name: "Notification");

            migrationBuilder.DropTable(
                name: "PolicyApproval");

            migrationBuilder.DropTable(
                name: "PolicyEmployee");

            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "PolicyRequest");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Policy");

            migrationBuilder.DropTable(
                name: "Hospital");

            migrationBuilder.DropTable(
                name: "InsuranceCompany");
        }
    }
}
