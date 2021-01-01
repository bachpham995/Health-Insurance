using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class PolicyRequest
    {
        [Key]
        public int RequestId { get; set; }

        [Key]
        public Employee Employee { get; set; }

        public string EmployeeId { get; set; }

        public Policy Policy { get; set; }

        public int PolicyId { get; set; }

        public DateTime RequestDate { get; set; }

        public bool Status { get; set; }

        public string Note { get; set; }

        public float Emi { get; set; }

        public float Amount { get; set; }

        //public virtual PolicyApproval PolicyApproval { get; set; }

        //public int ApprovalId { get; set; }
    }
}
