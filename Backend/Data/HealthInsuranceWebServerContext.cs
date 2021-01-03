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
            //modelBuilder.Entity<Address>().HasData(
            //    new Address() { AddressId = 1, City="Random City", Country="Random Country", District = "Random District", PostalCode="70000", Street="Random Street"}
            //);

            //modelBuilder.Entity<InsuranceCompany>().HasData(
            //    new InsuranceCompany() { InsCompanyId = 1, InsCompanyName = "UnitedHealth Group Incorporated", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 2, InsCompanyName = "AXA S.A.", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 3, InsCompanyName = "China Life Insurance (Group) Company", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 4, InsCompanyName = "Ping An Insurance (Group) Company of China Ltd", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 5, InsCompanyName = "Allianz SE", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 6, InsCompanyName = "Anthem, Inc.", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 7, InsCompanyName = "Kaiser Foundation Group of Health Plans", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 8, InsCompanyName = "Assicurazioni Generali S.p.A", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 9, InsCompanyName = "State Farm Group", Phone = "1234-5678-1011", AddressId = 1 },
            //    new InsuranceCompany() { InsCompanyId = 10, InsCompanyName = "People’s Insurance Company (Group) of China Ltd", Phone = "1234-5678-1011", AddressId = 1 });

            //modelBuilder.Entity<Policy>().HasData(
            //    new Policy() { PolicyId = 1, InsCompanyId = 1, Amount = 3000, Emi = 250, Benefit="Random Benefit", Description="Random Description", PolicyName="Random Name", PolicyNumber="21-00001"},
            //    new Policy() { PolicyId = 2, InsCompanyId = 1, Amount = 2467, Emi = 123, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00002" },
            //    new Policy() { PolicyId = 3, InsCompanyId = 1, Amount = 9876, Emi = 222, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00003" },
            //    new Policy() { PolicyId = 4, InsCompanyId = 1, Amount = 2345, Emi = 785, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00004" },
            //    new Policy() { PolicyId = 5, InsCompanyId = 1, Amount = 9876, Emi = 234, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00005" },
            //    new Policy() { PolicyId = 6, InsCompanyId = 1, Amount = 12345, Emi = 111, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00006" },
            //    new Policy() { PolicyId = 7, InsCompanyId = 1, Amount = 123, Emi = 222, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00007" },
            //    new Policy() { PolicyId = 8, InsCompanyId = 1, Amount = 987654, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00008" },
            //    new Policy() { PolicyId = 9, InsCompanyId = 1, Amount = 347, Emi = 96, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00009" },
            //    new Policy() { PolicyId = 10, InsCompanyId = 1, Amount = 1000, Emi = 250, Benefit = "Random Benefit", Description = "Random Description", PolicyName = "Random Name", PolicyNumber = "21-00010" }

            //    );

        }

        public DbSet<HealthInsuranceWebServer.Models.Admin> Admin { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Employee> Employee { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Feedback> Feedback { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Hospital> Hospital { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.InsuranceCompany> InsuranceCompany { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Notification> Notification { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Policy> Policy { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.PolicyApproval> PolicyApproval { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.PolicyEmployee> PolicyEmployee { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.PolicyRequest> PolicyRequest { get; set; }
    }
}
