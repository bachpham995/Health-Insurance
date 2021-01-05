using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace HealthInsuranceWebServer.Models
{
    public class InsuranceCompany
    {
        [Key]
        public int InsuranceCompanyId { get; set; }

        [Required(ErrorMessage = "Name of Insurance Company can't blank!")]
        [MaxLength(255)]
        public string InsCompanyName { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(255)]
        public string Url { get; set; }

        [MaxLength(255)]
        public string Img { get; set; }

        public Address Address { get; set; }

        [DefaultValue("false")]
        public bool Retired { get; set; }

        public ICollection<Policy> Policies { get; set; }
    }
}
