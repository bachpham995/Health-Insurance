using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace HealthInsuranceWebServer.Models
{
    public class PolicyEmployee
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        [ForeignKey("Policy")]
        public int PolicyId { get; set; }
        public Policy Policy { get; set; }

        public int Duration { get; set; }

        public DateTime EffectiveDate { get; set; }

        public DateTime ExpiredDate { get; set; }

        public float Amount { get; set; }

        public float Emi { get; set; }

        public bool Status { get; set; }
        
        [DefaultValue("false")]
        public bool Retired { get; set; }
    }
}
