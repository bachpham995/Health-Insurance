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
        [Column("Street")]
        [MaxLength(255)]
        public virtual string Street { get; set; }
        [Column("District")]
        [MaxLength(50)]
        public virtual string District { get; set; }
        [Column("City")]
        [MaxLength(50)]
        public virtual string City { get; set; }
        [Column("Country")]
        [MaxLength(50)]
        public virtual string Country { get; set; }
        [Column("PostalCode")]
        [MaxLength(10)]
        public virtual string PostalCode { get; set; }
    }
}
