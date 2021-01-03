using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace HealthInsuranceWebServer.Models
{
    public class Policy
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PolicyId { get; set; }

        [MaxLength(15)]
        [Required(ErrorMessage = "Policy Number can't blank!")]
        public string PolicyNumber { get; set; }

        [MaxLength(255)]
        [Required(ErrorMessage = "Policy Name can't blank!")]
        public string PolicyName { get; set; }

        [Required(ErrorMessage = "Amount can't blank!")]
        public float Amount { get; set; }

        [Required(ErrorMessage = "Emi can't blank!")]
        public float Emi { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Benefit can't blank!")]
        [MaxLength(255)]
        public string Benefit { get; set; }

        [DefaultValue("false")]
        public bool Retired { get; set; }

        public int InsCompanyId { get; set; }
        public InsuranceCompany InsCompany { get; set; }

        public ICollection<PolicyEmployee> PolicyEmployees { get; set; }
        
        public int HospitalId { get; set; }

        public Hospital Hospitals { get; set; }

        public ICollection<PolicyRequest> PolicyRequests { get; set; }
    }
}
