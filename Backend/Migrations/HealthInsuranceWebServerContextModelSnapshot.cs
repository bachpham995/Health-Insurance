﻿// <auto-generated />
using System;
using HealthInsuranceWebServer.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HealthInsuranceWebServer.Migrations
{
    [DbContext(typeof(HealthInsuranceWebServerContext))]
    partial class HealthInsuranceWebServerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Admin", b =>
                {
                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("Username");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Designation")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<DateTime?>("DoB")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("FName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<DateTime?>("JoinDate")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("LName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<bool>("Retired")
                        .HasColumnType("bit");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("EmployeeId");

                    b.ToTable("Employee");

                    b.HasData(
                        new
                        {
                            EmployeeId = 1,
                            Designation = "Senior Cleaner",
                            DoB = new DateTime(1996, 5, 30, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "phatltuit@gmail.com",
                            FName = "Phat",
                            JoinDate = new DateTime(2031, 1, 3, 20, 22, 58, 190, DateTimeKind.Local).AddTicks(1042),
                            LName = "Luu Trong",
                            Password = "123",
                            Phone = "058256332X",
                            Retired = false,
                            Status = true,
                            Username = "phatltuit"
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Feedback", b =>
                {
                    b.Property<int>("FeedbackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Response")
                        .HasColumnType("text");

                    b.Property<bool>("Retired")
                        .HasColumnType("bit");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("FeedbackId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Feedback");
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Hospital", b =>
                {
                    b.Property<int>("HospitalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("HospitalName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Img")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<bool>("Retired")
                        .HasColumnType("bit");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("HospitalId");

                    b.ToTable("Hospital");

                    b.HasData(
                        new
                        {
                            HospitalId = 1,
                            HospitalName = "Phu Nhuan",
                            Phone = "749123087",
                            Retired = false
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.InsuranceCompany", b =>
                {
                    b.Property<int>("InsCompanyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Img")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("InsCompanyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<bool>("Retired")
                        .HasColumnType("bit");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.HasKey("InsCompanyId");

                    b.ToTable("InsuranceCompany");

                    b.HasData(
                        new
                        {
                            InsCompanyId = 1,
                            InsCompanyName = "UnitedHealth Group Incorporated",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 2,
                            InsCompanyName = "AXA S.A.",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 3,
                            InsCompanyName = "China Life Insurance (Group) Company",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 4,
                            InsCompanyName = "Ping An Insurance (Group) Company of China Ltd",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 5,
                            InsCompanyName = "Allianz SE",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 6,
                            InsCompanyName = "Anthem, Inc.",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 7,
                            InsCompanyName = "Kaiser Foundation Group of Health Plans",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 8,
                            InsCompanyName = "Assicurazioni Generali S.p.A",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 9,
                            InsCompanyName = "State Farm Group",
                            Phone = "1234-5678-1011",
                            Retired = false
                        },
                        new
                        {
                            InsCompanyId = 10,
                            InsCompanyName = "People’s Insurance Company (Group) of China Ltd",
                            Phone = "1234-5678-1011",
                            Retired = false
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AdminId")
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("AdminId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Notification");
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Policy", b =>
                {
                    b.Property<int>("PolicyId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<string>("Benefit")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<float>("Emi")
                        .HasColumnType("real");

                    b.Property<int>("HospitalId")
                        .HasColumnType("int");

                    b.Property<int>("InsCompanyId")
                        .HasColumnType("int");

                    b.Property<string>("PolicyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("PolicyNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(15)")
                        .HasMaxLength(15);

                    b.Property<bool>("Retired")
                        .HasColumnType("bit");

                    b.HasKey("PolicyId");

                    b.HasIndex("HospitalId");

                    b.HasIndex("InsCompanyId");

                    b.ToTable("Policy");

                    b.HasData(
                        new
                        {
                            PolicyId = 1,
                            Amount = 3000f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 250f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00001",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 2,
                            Amount = 2467f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 123f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00002",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 3,
                            Amount = 9876f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 222f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00003",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 4,
                            Amount = 2345f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 785f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00004",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 5,
                            Amount = 9876f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 234f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00005",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 6,
                            Amount = 12345f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 111f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00006",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 7,
                            Amount = 123f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 222f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00007",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 8,
                            Amount = 987654f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 250f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00008",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 9,
                            Amount = 347f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 96f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00009",
                            Retired = false
                        },
                        new
                        {
                            PolicyId = 10,
                            Amount = 1000f,
                            Benefit = "Random Benefit",
                            Description = "Random Description",
                            Emi = 250f,
                            HospitalId = 1,
                            InsCompanyId = 1,
                            PolicyName = "Random Name",
                            PolicyNumber = "21-00010",
                            Retired = false
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.PolicyApproval", b =>
                {
                    b.Property<int>("ApprovalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("ApprovalDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RequestId")
                        .HasColumnType("int");

                    b.Property<bool>("Retired")
                        .HasColumnType("bit");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("ApprovalId");

                    b.HasIndex("RequestId");

                    b.ToTable("PolicyApproval");
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.PolicyEmployee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<DateTime>("EffectiveDate")
                        .HasColumnType("datetime2");

                    b.Property<float>("Emi")
                        .HasColumnType("real");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ExpiredDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PolicyId")
                        .HasColumnType("int");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PolicyId");

                    b.ToTable("PolicyEmployee");
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.PolicyRequest", b =>
                {
                    b.Property<int>("RequestId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<float>("Amount")
                        .HasColumnType("real");

                    b.Property<float>("Emi")
                        .HasColumnType("real");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("int");

                    b.Property<string>("Note")
                        .HasColumnType("nvarchar(255)")
                        .HasMaxLength(255);

                    b.Property<int>("PolicyId")
                        .HasColumnType("int");

                    b.Property<byte[]>("RequestDate")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<bool>("Status")
                        .HasColumnType("bit");

                    b.HasKey("RequestId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PolicyId");

                    b.ToTable("PolicyRequest");
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Employee", b =>
                {
                    b.OwnsOne("HealthInsuranceWebServer.Models.Address", "Address", b1 =>
                        {
                            b1.Property<int>("EmployeeId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("Country")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("District")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("PostalCode")
                                .HasColumnType("nvarchar(10)")
                                .HasMaxLength(10);

                            b1.Property<string>("Street")
                                .HasColumnType("nvarchar(255)")
                                .HasMaxLength(255);

                            b1.HasKey("EmployeeId");

                            b1.ToTable("Employee");

                            b1.WithOwner()
                                .HasForeignKey("EmployeeId");
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Feedback", b =>
                {
                    b.HasOne("HealthInsuranceWebServer.Models.Employee", "Employee")
                        .WithMany("Feedbacks")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Hospital", b =>
                {
                    b.OwnsOne("HealthInsuranceWebServer.Models.Address", "Address", b1 =>
                        {
                            b1.Property<int>("HospitalId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("Country")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("District")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("PostalCode")
                                .HasColumnType("nvarchar(10)")
                                .HasMaxLength(10);

                            b1.Property<string>("Street")
                                .HasColumnType("nvarchar(255)")
                                .HasMaxLength(255);

                            b1.HasKey("HospitalId");

                            b1.ToTable("Hospital");

                            b1.WithOwner()
                                .HasForeignKey("HospitalId");
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.InsuranceCompany", b =>
                {
                    b.OwnsOne("HealthInsuranceWebServer.Models.Address", "Address", b1 =>
                        {
                            b1.Property<int>("InsuranceCompanyInsCompanyId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<string>("City")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("Country")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("District")
                                .HasColumnType("nvarchar(50)")
                                .HasMaxLength(50);

                            b1.Property<string>("PostalCode")
                                .HasColumnType("nvarchar(10)")
                                .HasMaxLength(10);

                            b1.Property<string>("Street")
                                .HasColumnType("nvarchar(255)")
                                .HasMaxLength(255);

                            b1.HasKey("InsuranceCompanyInsCompanyId");

                            b1.ToTable("InsuranceCompany");

                            b1.WithOwner()
                                .HasForeignKey("InsuranceCompanyInsCompanyId");
                        });
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Notification", b =>
                {
                    b.HasOne("HealthInsuranceWebServer.Models.Admin", "Admin")
                        .WithMany("Notification")
                        .HasForeignKey("AdminId");

                    b.HasOne("HealthInsuranceWebServer.Models.Employee", "Employee")
                        .WithMany("Notification")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.Policy", b =>
                {
                    b.HasOne("HealthInsuranceWebServer.Models.Hospital", "Hospitals")
                        .WithMany("Policies")
                        .HasForeignKey("HospitalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthInsuranceWebServer.Models.InsuranceCompany", "InsCompany")
                        .WithMany("Policies")
                        .HasForeignKey("InsCompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.PolicyApproval", b =>
                {
                    b.HasOne("HealthInsuranceWebServer.Models.PolicyRequest", "PolicyRequest")
                        .WithMany()
                        .HasForeignKey("RequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.PolicyEmployee", b =>
                {
                    b.HasOne("HealthInsuranceWebServer.Models.Employee", "Employee")
                        .WithMany("PolicyEmployee")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthInsuranceWebServer.Models.Policy", "Policy")
                        .WithMany("PolicyEmployees")
                        .HasForeignKey("PolicyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("HealthInsuranceWebServer.Models.PolicyRequest", b =>
                {
                    b.HasOne("HealthInsuranceWebServer.Models.Employee", "Employee")
                        .WithMany("PolicyRequest")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HealthInsuranceWebServer.Models.Policy", "Policy")
                        .WithMany("PolicyRequests")
                        .HasForeignKey("PolicyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
