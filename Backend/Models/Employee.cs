using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }

        public string FName { get; set; }

        public string LName { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public DateTime JoinDate { get; set; }

        public string Designation { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }

        public virtual Address Address { get; set; }

        public int AddressId { get; set; }

        public DateTime DoB { get; set; }

        public bool Status { get; set; }

        public ICollection<Feedback> Feedbacks { get; set; }

        public ICollection<PolicyEmployee> PolicyEmployees { get; set; }

        public ICollection<PolicyRequest> PolicyRequests { get; set; }

    }
}
