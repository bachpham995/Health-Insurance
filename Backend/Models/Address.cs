using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    [ComplexType]
    public class Address
    {
        [MaxLength(255)]
        public string Street { get; set; }
        [MaxLength(50)]
        public string District { get; set; }
        [MaxLength(50)]
        public string City { get; set; }
        [MaxLength(50)]
        public string Country { get; set; }
        [MaxLength(10)]
        public string PostalCode { get; set; }
    }
}
