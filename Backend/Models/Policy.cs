using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Policy
    {
        [Key]
        public int PolicyId { get; set; }

        [StringLength(15)]
        public string PolicyNumber { get; set; }

        public string PolicyName { get; set; }

        public float Amount { get; set; }

        
        public float Emi { get; set; }

        public string Description { get; set; }

        public string Benefit { get; set; }

        public ICollection<PolicyEmployee> PolicyEmployees { get; set; }

        public ICollection<Hospital> Hospitals { get; set; }

        public ICollection<PolicyRequest> PolicyRequests { get; set; }

        public virtual InsuranceCompany InsuranceCompany { get; set; }

        public int InsCompanyId { get; set; }

        public bool Retired { get; set; }
    }
}
