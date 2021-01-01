using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class PolicyApproval
    {
        [Key]
        public int ApprovalId { get; set; }

        public DateTime ApprovalDate { get; set; }

        public bool Status { get; set; }

        public string Reason { get; set; }

        public PolicyRequest PolicyRequest { get; set; }

        public int RequestId { get; set; }
    }
}
