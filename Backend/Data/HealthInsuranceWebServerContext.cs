
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using HealthInsuranceWebServer.Models;

namespace HealthInsuranceWebServer.Data
{
    public class HealthInsuranceWebServerContext : DbContext
    {
        public HealthInsuranceWebServerContext (DbContextOptions<HealthInsuranceWebServerContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(entity => { entity.OwnsOne(e => e.Address); });
            modelBuilder.Entity<Employee>().HasIndex(e=>e.Username);
            modelBuilder.Entity<Notification>().HasOne(n => n.FromUser).WithMany(e => e.FromNotifications).HasForeignKey(m=>m.FromUserId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Notification>().HasOne(n => n.ToUser).WithMany(e => e.ToNotifications).HasForeignKey(m=>m.ToUserId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Hospital>(entity => { entity.OwnsOne(e => e.Address); });
            modelBuilder.Entity<InsuranceCompany>(entity =>{entity.OwnsOne(e => e.Address);});

            modelBuilder.Entity<Hospital>().HasData(
                 new Hospital() { HospitalId = 1, HospitalName = "Bệnh viện Nhân Dân Gia Định", Phone = "08-3841-2692"}
               , new Hospital() { HospitalId = 2, HospitalName = "Bệnh viện Đại học Y Dược TP HCM", Phone = "08-3855-4269"}
               , new Hospital() { HospitalId = 3, HospitalName = "Bệnh viện Y Học Cổ Truyển", Phone = "08-3932-6004"}
               , new Hospital() { HospitalId = 4, HospitalName = "Bệnh viện Bình Dân", Phone = "08-3839-4747"}
               , new Hospital() { HospitalId = 5, HospitalName = "Bệnh viện Tai Mũi Họng TP HCM", Phone = "08-3931-7381"}
               , new Hospital() { HospitalId = 6, HospitalName = "Bệnh viện Mắt TP HCM", Phone = "08-3932-6732"}
               , new Hospital() { HospitalId = 7, HospitalName = "Bệnh viện Nhi Đồng 2", Phone = "08-3829-8385"}
               , new Hospital() { HospitalId = 8, HospitalName = "Bệnh viện Đa Khoa Vạn Hạnh", Phone = "08-3863-1272"}
               , new Hospital() { HospitalId = 9, HospitalName = "Bệnh viện Đa Khoa Hoàn Mỹ", Phone = "08-3990-2468"}
               , new Hospital() { HospitalId = 10, HospitalName = "Bệnh Viện Đa Khoa Hồng Đức", Phone = "08-3996-9999"}
               );

            modelBuilder.Entity<Hospital>().OwnsOne(e => e.Address).HasData(
                      new { HospitalId = 1, Street = "1 Nơ Trang Long", District = "Quận Bình Thạnh", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72316" }
                    , new { HospitalId = 2, Street = "215 Hồng Bàng", District = "Quận 5", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72709" }
                    , new { HospitalId = 3, Street = "Nam Kỳ Khởi Nghĩa", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72406" }
                    , new { HospitalId = 4, Street = "Điện Biên Phủ", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72416" }
                    , new { HospitalId = 5, Street = "155B Trần Quốc Thảo", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72414" }
                    , new { HospitalId = 6, Street = "Điện Biên Phủ", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72417" }
                    , new { HospitalId = 7, Street = "33 Nguyễn Du", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71007" }
                    , new { HospitalId = 8, Street = "Sư Vạn Hạnh", District = "Quận 10", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72510" }
                    , new { HospitalId = 9, Street = "60 - 60A Phan Xích Long", District = "Quận Phú Nhuận", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72209" }
                    , new { HospitalId = 10, Street = "32/2 Thống Nhất", District = "Quận Gò Vấp", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71411" }
                );

            modelBuilder.Entity<InsuranceCompany>().HasData(
                 new InsuranceCompany() { InsuranceCompanyId = 1, InsCompanyName = "Công ty Bảo Việt Nhân Thọ", Phone = "028-39-101-660", Url = "https://www.baovietnhantho.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 2, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ Prudential", Phone = "(028)-39-101-660", Url = "https://www.prudential.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 3, InsCompanyName = "Công ty TNHH Manulife", Phone = "1234-5678-1011" , Url = "https://www.manulife.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 4, InsCompanyName = "Công ty TNHH Bảo hiểm Nhân thọ Dai-ichi", Phone = "028-3810-0888", Url = "https://dai-ichi-life.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 5, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ AIA", Phone = "028-3812-2777", Url = "https://www.aia.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 6, InsCompanyName = "Công ty TNHH Bảo hiểm Nhân thọ Sun Life", Phone = "028-629-85-888", Url = "https://www.sunlife.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 7, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ Generali", Phone = "1234-5678-1011", Url = "https://www.generali-life.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 8, InsCompanyName = "Công ty TNHH Bảo hiểm Nhân thọ Chubb", Phone = "028-3827-8989", Url = "https://www.chubb.com/"}
               , new InsuranceCompany() { InsuranceCompanyId = 9, InsCompanyName = "Công ty TNHH Bảo hiểm Hanwha Life", Phone = "028-3914-9100", Url = "https://www.hanwhalife.com.vn/"}
               , new InsuranceCompany() { InsuranceCompanyId = 10, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ Aviva", Phone = "1900-633-369", Url = "https://www.aviva.com.vn/"}
               );

            modelBuilder.Entity<InsuranceCompany>().OwnsOne(e => e.Address).HasData(
                      new { InsuranceCompanyId = 1, Street = "Phạm Hùng", District = "Nam Từ Liêm", City = "Ha Noi", Country = "Vietnam", PostalCode = "12014" }
                    , new { InsuranceCompanyId = 2, Street = "Tôn Đức Thắng", District = " Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71006" }
                    , new { InsuranceCompanyId = 3, Street = "75 Hoàng Văn Thái", District = "Quận 7", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72911" }
                    , new { InsuranceCompanyId = 4, Street = "149-151 Nguyễn Văn Trỗi", District = "Quận Phú Nhuận", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72206" }
                    , new { InsuranceCompanyId = 5, Street = "67 Lê Lợi", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71007" }
                    , new { InsuranceCompanyId = 6, Street = "5 Công Trường Mê Linh", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71015" }
                    , new { InsuranceCompanyId = 7, Street = "76 Lê Lai", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71011" }
                    , new { InsuranceCompanyId = 8, Street = "115 Nguyễn Huệ", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71015" }
                    , new { InsuranceCompanyId = 9, Street = "81 - 85 Hàm Nghi", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71007" }
                    , new { InsuranceCompanyId = 10, Street = "229 Tây Sơn", District = "Quận Đống Đa", City = "Ha Noi", Country = "Vietnam", PostalCode = "11508" }
                );

            modelBuilder.Entity<Policy>().HasData(
               new Policy() { PolicyId = 1, InsCompanyId = 1, Amount = 3000, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00001", HospitalId = 1 },
               new Policy() { PolicyId = 2, InsCompanyId = 2, Amount = 2467, Emi = 123, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00002", HospitalId = 2 },
               new Policy() { PolicyId = 3, InsCompanyId = 3, Amount = 9876, Emi = 222, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00003", HospitalId = 3 },
               new Policy() { PolicyId = 4, InsCompanyId = 4, Amount = 2345, Emi = 785, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00004", HospitalId = 4 },
               new Policy() { PolicyId = 5, InsCompanyId = 5, Amount = 9876, Emi = 234, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00005", HospitalId = 5 },
               new Policy() { PolicyId = 6, InsCompanyId = 6, Amount = 12345, Emi = 111, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00006", HospitalId = 6 },
               new Policy() { PolicyId = 7, InsCompanyId = 7, Amount = 123, Emi = 222, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00007", HospitalId = 7 },
               new Policy() { PolicyId = 8, InsCompanyId = 8, Amount = 987654, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00008", HospitalId = 8 },
               new Policy() { PolicyId = 9, InsCompanyId = 9, Amount = 347, Emi = 96, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00009", HospitalId = 9 },
               new Policy() { PolicyId = 10, InsCompanyId = 10, Amount = 1000, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00010", HospitalId = 10 }
               );

            modelBuilder.Entity<Employee>().HasData(
                 new Employee(){ EmployeeId = 1, FName = "Phat", LName="Luu Trong", Username="admin", Password="123", Email ="phatltuit@gmail.com",Designation = "Admin", Phone = "058256332X", Role = 0
                               , JoinDate=DateTime.Now.AddYears(-10), DoB = new DateTime(1996, 05,30), Img="http://localhost:6969/imgs/employee/luutrongphat.png"}
               , new Employee(){ EmployeeId = 2, FName = "Bach", LName="Pham Xuan", Username="bachpham", Password="123", Email ="bachpham@gmail.com",Designation = "Senior SE", Phone = "012345678X", Role = 1
                               , JoinDate=DateTime.Now.AddYears(-5), DoB = new DateTime(1996, 05,30), Img="http://localhost:6969/imgs/employee/bachpham.jpg"}
               , new Employee(){ EmployeeId = 3, FName = "Hoa", LName="Nguyen Vu Hoang", Username="hoanghoa", Password="123", Email ="nguyenvuhoanghoa@gmail.com",Designation = "Junior SE", Phone = "01232278X", Role = 1
                               , JoinDate=DateTime.Now.AddYears(-2), DoB = new DateTime(1996, 05,30), Img="http://localhost:6969/imgs/employee/hoanghoa.jpg"}
               );

            modelBuilder.Entity<Employee>().OwnsOne(e => e.Address).HasData(
                      new { EmployeeId = 1, Street = "Nguyễn Ảnh Thủ, Bà Điểm", District = "Hóc Môn", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "70000"}
                    , new { EmployeeId = 2, Street = "Tân Thới Nhất", District = "Quận 12", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "" }
                    , new { EmployeeId = 3, Street = "Xô Viết Nghệ Tĩnh", District = "Quận Bình Thạnh", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "" }
                );

            modelBuilder.Entity<Notification>().HasData(//only 2 type: => 0 request, 1 feedback
                new Notification(){Id = 1, FromUserId = 2, ToUserId=1, Date = DateTime.Now.AddDays(-123),Title="Policy Request", Description="A User has submit a feedback.", Status = false, Type = 0, RelatedId = 4, RelatedType = "feedbacks"},
                new Notification(){Id = 2, FromUserId = 3, ToUserId=1, Date = DateTime.Now,              Title="Feedback", Description="A User has submit a feedback.", Status = false, Type = 0, RelatedId = 1, RelatedType = "feedbacks"},
                new Notification(){Id = 3, FromUserId = 3, ToUserId=1, Date = DateTime.Now.AddDays(-3),Title="Policy Request", Description="A User has submit a policy request.", Status = false, Type = 0},
                new Notification(){Id = 4, FromUserId = 2, ToUserId=1, Date = DateTime.Now.AddMinutes(5),Title="Policy Request", Description="A User has submit a policy request.", Status = false, Type = 0},
                new Notification(){Id = 5, FromUserId = 3, ToUserId=1, Date = DateTime.Now.AddYears(-1),Title="Policy Request", Description="A User has submit a policy request.", Status = false, Type = 0},
                new Notification(){Id = 6, FromUserId = 2, ToUserId=1, Date = DateTime.Now.AddHours(-4),Title="Policy Request", Description="A User has submit a policy request.", Status = false, Type = 0},
                new Notification(){Id = 7, FromUserId = 3, ToUserId=1, Date = DateTime.Now.AddMonths(-2),Title="Policy Request", Description="A User has submit a policy request.", Status = false, Type = 0},
                new Notification(){Id = 8, FromUserId = 3, ToUserId=1, Date = DateTime.Now.AddDays(-14),Title="Policy Request", Description="A User has submit a feedback.", Status = false, Type = 0, RelatedId = 2, RelatedType = "feedbacks"},
                new Notification(){Id = 9, FromUserId = 2, ToUserId=1, Date = DateTime.Now.AddDays(-8),Title="Policy Request", Description="A User has submit a feedback.", Status = false, Type = 0, RelatedId = 5, RelatedType = "feedbacks"},
                new Notification(){Id = 10, FromUserId = 3, ToUserId=1, Date = DateTime.Now.AddDays(-1),Title="Policy Request", Description="A User has submit a feedback.", Status = false, Type = 0, RelatedId = 3, RelatedType = "feedbacks"}
            );

            modelBuilder.Entity<Feedback>().HasData(
                new Feedback(){FeedbackId = 1, EmployeeId = 3, Title="This is the test feed back feature", Content="This is the test feed back feature", Date=DateTime.Now.AddDays(-15)},
                new Feedback(){FeedbackId = 2, EmployeeId = 3, Title="This is the test feed back feature", Content="This is the test feed back feature", Date=DateTime.Now.AddDays(-1)},
                new Feedback(){FeedbackId = 3, EmployeeId = 3, Title="This is the test feed back feature", Content="This is the test feed back feature", Date=DateTime.Now.AddDays(-5)},
                new Feedback(){FeedbackId = 4, EmployeeId = 2, Title="This is the test feed back feature", Content="This is the test feed back feature", Date=DateTime.Now},
                new Feedback(){FeedbackId = 5, EmployeeId = 2, Title="This is the test feed back feature", Content="This is the test feed back feature", Date=DateTime.Now.AddDays(-2)}
                
            );
            modelBuilder.Entity<PolicyRequest>().HasData(
                new PolicyRequest() { RequestId = 1, EmployeeId = 3, PolicyId = 4,RequestDate = DateTime.Now,Status=0,Note="Please accep for me huhu",Emi=200,Amount=400,Retired=false},
                new PolicyRequest() { RequestId = 2, EmployeeId = 2, PolicyId = 5, RequestDate = DateTime.Now, Status = 0, Note = "Please accep for me huhu bobo", Emi = 500, Amount = 800, Retired = false },
                new PolicyRequest() { RequestId = 3, EmployeeId = 2, PolicyId = 2, RequestDate = DateTime.Now, Status = 0, Note = "Please accep for me huhu bubu", Emi = 700, Amount = 1000, Retired = false }
            );
        }
        public DbSet<Employee> Employee { get; set; }

        public DbSet<Feedback> Feedback { get; set; }

        public DbSet<Hospital> Hospital { get; set; }

        public DbSet<InsuranceCompany> InsuranceCompany { get; set; }

        public DbSet<Notification> Notification { get; set; }

        public DbSet<Policy> Policy { get; set; }

        public DbSet<PolicyApproval> PolicyApproval { get; set; }

        public DbSet<PolicyEmployee> PolicyEmployee { get; set; }

        public DbSet<PolicyRequest> PolicyRequest { get; set; }
    }
}
