using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Hospital
    {
        [Key]
        public int HospitalId { get; set; }

        public string HospitalName { get; set; }

        public string Phone { get; set; }

        public string Url { get; set; }
        
        public string Img { get; set; }

        public virtual Address Address { get; set; }

        public int AddressId { get; set; }
    }
}
