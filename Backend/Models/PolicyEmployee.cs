using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class PolicyEmployee
    {
        [Key]
        public Employee Employee { get; set; }
        [Key]
        public string EmployeeId { get; set; }

        public Policy Policy { get; set; }

        public int PolicyId { get; set; }

        public int Duration { get; set; }

        public DateTime EffectiveDate { get; set; }

        public DateTime ExpiredDate { get; set; }

        public float Amount { get; set; }

        public float Emi { get; set; }

        public bool Status { get; set; }
    }
}
