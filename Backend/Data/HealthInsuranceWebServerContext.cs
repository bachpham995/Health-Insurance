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

        public DbSet<HealthInsuranceWebServer.Models.Address> Address { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Admin> Admin { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Employee> Employee { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Feedback> Feedback { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Hospital> Hospital { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.InsuranceCompany> InsuranceCompany { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.Policy> Policy { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.PolicyApproval> PolicyApproval { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.PolicyEmployee> PolicyEmployee { get; set; }

        public DbSet<HealthInsuranceWebServer.Models.PolicyRequest> PolicyRequest { get; set; }
    }
}
