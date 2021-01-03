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
            modelBuilder.Entity<Hospital>(entity => { entity.OwnsOne(e => e.Address); });
            modelBuilder.Entity<InsuranceCompany>(entity =>{entity.OwnsOne(e => e.Address);});

            //modelBuilder.Entity<Hospital>().HasData(
            //      new Hospital() { HospitalId = 1, HospitalName = "Bệnh viện Nhân Dân Gia Định", Phone = "08-3841-2692"
            //                     , Address = new Address() { Street = "1 Nơ Trang Long", District = "Quận Bình Thạnh", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72316" } }
            //    , new Hospital() { HospitalId = 2, HospitalName = "Bệnh viện Đại học Y Dược TP HCM", Phone = "08-3855-4269"
            //                     , Address = new Address() { Street = "215 Hồng Bàng", District = "Quận 5", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72709" } }
            //    , new Hospital() { HospitalId = 3, HospitalName = "Bệnh viện Y Học Cổ Truyển", Phone = "08-3932-6004"
            //                     , Address = new Address(){ Street = "Nam Kỳ Khởi Nghĩa", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72406" } }
            //    , new Hospital() { HospitalId = 4, HospitalName = "Bệnh viện Bình Dân", Phone = "08-3839-4747"
            //                     , Address = new Address() { Street = "Điện Biên Phủ", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72416" } }
            //    , new Hospital() { HospitalId = 5, HospitalName = "Bệnh viện Tai Mũi Họng TP HCM", Phone = "08-3931-7381"
            //                     , Address = new Address() { Street = "155B Trần Quốc Thảo", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72414" } }
            //    , new Hospital() { HospitalId = 6, HospitalName = "Bệnh viện Mắt TP HCM", Phone = "08-3932-6732"
            //                     , Address = new Address(){ Street = "Điện Biên Phủ", District = "Quận 3", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72417" } }
            //    , new Hospital() { HospitalId = 7, HospitalName = "Bệnh viện Nhi Đồng 2", Phone = "08-3829-8385"
            //                     , Address = new Address() { Street = "33 Nguyễn Du", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71007" } }
            //    , new Hospital() { HospitalId = 8, HospitalName = "Bệnh viện Đa Khoa Vạn Hạnh", Phone = "08-3863-1272"
            //                     , Address = new Address() { Street = "Sư Vạn Hạnh", District = "Quận 10", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72510" } }
            //    , new Hospital() { HospitalId = 9, HospitalName = "Bệnh viện Đa Khoa Hoàn Mỹ", Phone = "08-3990-2468"
            //                     , Address = new Address(){ Street = "60 - 60A Phan Xích Long", District = "Quận Phú Nhuận", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72209" } }
            //    , new Hospital() { HospitalId = 10, HospitalName = "Bệnh Viện Đa Khoa Hồng Đức", Phone = "08-3996-9999"
            //                     , Address = new Address() { Street = "32/2 Thống Nhất", District = "Quận Gò Vấp", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71411" } }
            //    );

            //modelBuilder.Entity<InsuranceCompany>().HasData(
            //      new InsuranceCompany() { InsCompanyId = 1, InsCompanyName = "Công ty Bảo Việt Nhân Thọ", Phone = "028-39-101-660", Url = "https://www.baovietnhantho.com.vn/",
            //                     , Address = new Address(){ Street = "Phạm Hùng", District = "Nam Từ Liêm", City = "Ha Noi", Country = "Vietnam", PostalCode = "12014" }}
            //    , new InsuranceCompany() { InsCompanyId = 2, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ Prudential", Phone = "(028)-39-101-660", Url = "https://www.prudential.com.vn/"
            //                     , Address = new Address(){ Street = "Tôn Đức Thắng", District = " Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71006" }}
            //    , new InsuranceCompany() { InsCompanyId = 3, InsCompanyName = "Công ty TNHH Manulife", Phone = "1234-5678-1011" , Url = "https://www.manulife.com.vn/"
            //                     , Address = new Address(){ Street = "75 Hoàng Văn Thái", District = "Quận 7", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72911" }}
            //    , new InsuranceCompany() { InsCompanyId = 4, InsCompanyName = "Công ty TNHH Bảo hiểm Nhân thọ Dai-ichi", Phone = "028-3810-0888", Url = "https://dai-ichi-life.com.vn/"
            //                     , Address = new Address(){ Street = "149-151 Nguyễn Văn Trỗi", District = "Quận Phú Nhuận", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "72206" }}
            //    , new InsuranceCompany() { InsCompanyId = 5, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ AIA", Phone = "028-3812-2777", Url = "https://www.aia.com.vn/"
            //                     , Address = new Address(){ Street = "67 Lê Lợi", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71007" }}
            //    , new InsuranceCompany() { InsCompanyId = 6, InsCompanyName = "Công ty TNHH Bảo hiểm Nhân thọ Sun Life", Phone = "028-629-85-888", Url = "https://www.sunlife.com.vn/"
            //                     , Address = new Address(){ Street = "5 Công Trường Mê Linh", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71015" }}
            //    , new InsuranceCompany() { InsCompanyId = 7, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ Generali", Phone = "1234-5678-1011", Url = "https://www.generali-life.com.vn/"
            //                     , Address = new Address(){ Street = "76 Lê Lai", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71011" }}
            //    , new InsuranceCompany() { InsCompanyId = 8, InsCompanyName = "Công ty TNHH Bảo hiểm Nhân thọ Chubb", Phone = "028-3827-8989", Url = "https://www.chubb.com/"
            //                     , Address = new Address(){ Street = "115 Nguyễn Huệ", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71015" }}
            //    , new InsuranceCompany() { InsCompanyId = 9, InsCompanyName = "Công ty TNHH Bảo hiểm Hanwha Life", Phone = "028-3914-9100", Url = "https://www.hanwhalife.com.vn/"
            //                     , Address = new Address(){ Street = "81 - 85 Hàm Nghi", District = "Quận 1", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "71007" }}
            //    , new InsuranceCompany() { InsCompanyId = 10, InsCompanyName = "Công ty TNHH bảo hiểm nhân thọ Aviva", Phone = "1900-633-369", Url = "https://www.aviva.com.vn/"
            //                     , Address = new Address(){ Street = "229 Tây Sơn", District = "Quận Đống Đa", City = "Ha Noi", Country = "Vietnam", PostalCode = "11508" }}
            //    );

            //modelBuilder.Entity<Policy>().HasData(
            //    new Policy() { PolicyId = 1, InsCompanyId = 1, Amount = 3000, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00001", HospitalId = 1 },
            //    new Policy() { PolicyId = 2, InsCompanyId = 1, Amount = 2467, Emi = 123, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00002", HospitalId = 2 },
            //    new Policy() { PolicyId = 3, InsCompanyId = 1, Amount = 9876, Emi = 222, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00003", HospitalId = 3 },
            //    new Policy() { PolicyId = 4, InsCompanyId = 1, Amount = 2345, Emi = 785, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00004", HospitalId = 4 },
            //    new Policy() { PolicyId = 5, InsCompanyId = 1, Amount = 9876, Emi = 234, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00005", HospitalId = 5 },
            //    new Policy() { PolicyId = 6, InsCompanyId = 1, Amount = 12345, Emi = 111, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00006", HospitalId = 6 },
            //    new Policy() { PolicyId = 7, InsCompanyId = 1, Amount = 123, Emi = 222, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00007", HospitalId = 7 },
            //    new Policy() { PolicyId = 8, InsCompanyId = 1, Amount = 987654, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00008", HospitalId = 8 },
            //    new Policy() { PolicyId = 9, InsCompanyId = 1, Amount = 347, Emi = 96, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00009", HospitalId = 9 },
            //    new Policy() { PolicyId = 10, InsCompanyId = 1, Amount = 1000, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00010", HospitalId = 10 }
            //    );

            //modelBuilder.Entity<Employee>().HasData(
            //      new Employee(){ EmployeeId = 1, FName = "Phat", LName="Luu Trong", Username="phatltuit", Password="123", Email ="phatltuit@gmail.com",Designation = "Senior Cleaner", Phone = "058256332X"
            //                    , JoinDate=DateTime.Now.AddYears(10), DoB = new DateTime(1996, 05,30)
            //                    , Address = new Address() { Street = "Nguyễn Ảnh Thủ, Bà Điểm", District = "Hóc Môn", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "" }, Status = true}
            //    , new Employee(){ EmployeeId = 2, FName = "Bach", LName="Pham Xuan", Username="bachpham", Password="123456789", Email ="bachpham@gmail.com",Designation = "Junior Cleaner", Phone = "012345678X"
            //                    , JoinDate=DateTime.Now.AddYears(10), DoB = new DateTime(1996, 05,30)
            //                    , Address = new Address() { Street = "Tân Thới Nhất", District = "Quận 12", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "" }, Status = true}
            //    , new Employee(){ EmployeeId = 3, FName = "Hoa", LName="Nguyen Vu Hoang", Username="nguyenvuhoanghoa", Password="123456789", Email ="nguyenvuhoanghoa@gmail.com",Designation = "Junior Cleaner", Phone = "01232278X"
            //                    , JoinDate=DateTime.Now.AddYears(10), DoB = new DateTime(1996, 05,30)
            //                    , Address = new Address() { Street = "Xô Viết Nghệ Tĩnh", District = "Quận Bình Thạnh", City = "Ho Chi Minh City", Country = "Vietnam", PostalCode = "" }, Status = true}
            //    );

            //modelBuilder.Entity<Admin>().HasData(
            //    new Admin() { Username = "Admin", Password = "123456789"}
            //    );
        }

        public DbSet<Admin> Admin { get; set; }

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
