using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Hospital
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int HospitalId { get; set; }

        [Required(ErrorMessage = "Hospital Name can't blank!")]
        [MaxLength(255)]
        public string HospitalName { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        [MaxLength(255)]
        public string Url { get; set; }

        [MaxLength(255)]
        public string Img { get; set; }

        public Address Address { get; set; }

        public ICollection<Policy> Policies { get; set; }

        [DefaultValue("false")]
        public bool Retired { get; set; }
    }
}
