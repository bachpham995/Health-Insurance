using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;

namespace HealthInsuranceWebServer.Models
{
    public class PolicyRequest
    {
        [Key]
        public int RequestId { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public int PolicyId { get; set; }
        public Policy Policy { get; set; }

        [DisplayFormat(DataFormatString = "{yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? RequestDate { get; set; }

        [DefaultValue("false")]
        public bool Status { get; set; }

        [MaxLength(255)]
        public string Note { get; set; }

        public float Emi { get; set; }

        public float Amount { get; set; }       

        [DefaultValue("false")]
        public bool Retired { get; set; }
    }
}
