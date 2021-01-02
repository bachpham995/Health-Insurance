using System.ComponentModel.DataAnnotations;

namespace HealthInsuranceWebServer.Models
{
    public class Address
    {
        [Key]
        public int AddressId { get; set; }

        public string Street { get; set; }

        public string District { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string PostalCode { get; set; }

        //public virtual Employee Employee { get; set; }

       // public string EmployeeId { get; set; }

        //public virtual InsuranceCompany InsuranceCompany { get; set; }

        //public int InsCompanyId { get; set; }

        //public virtual Hospital Hospital { get; set; }

       // public int HospitalId { get; set; }
    }
}