using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace HealthInsuranceWebServer.Models
{
    public class PolicyApproval
    {
        [Key]
        public int ApprovalId { get; set; }

        [DataType(DataType.Date)]
        public DateTime ApprovalDate { get; set; }

        [DefaultValue("false")]
        public bool Status { get; set; }

        [Required(ErrorMessage = "Reason must be required!")]
        public string Reason { get; set; }

        [ForeignKey("PolicyRequest")]
        public int RequestId { get; set; }
        public PolicyRequest PolicyRequest { get; set; }

        [DefaultValue("false")]
        public bool Retired { get; set; }
    }
}
