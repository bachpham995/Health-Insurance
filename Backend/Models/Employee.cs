using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Employee
    {
        [Key]
        [Required(ErrorMessage = "Employee Id can't blank")]
        public int EmployeeId { get; set; }

        [Required(ErrorMessage = "First Name can't blank")]
        [MaxLength(50)]
        public string FName { get; set; }

        [Required(ErrorMessage = "Last Name can't blank")]
        [MaxLength(50)]
        public string LName { get; set; }

        [Required(ErrorMessage = "Username can't blank")]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password can't blank")]
        [MaxLength(255)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Join Date can't blank")]
        [DataType(DataType.Date)]
        public DateTime? JoinDate { get; set; }

        [Required(ErrorMessage = "Designation can't blank")]
        [MaxLength(50)]
        public string Designation { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Phone { get; set; }

        public Address Address { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DoB { get; set; }

        [Required(ErrorMessage = "Status can't blank")]
        [DefaultValue("true")]
        public bool Status { get; set; }

        [MaxLength(255)]
        public string Img { get; set; }


        [DefaultValue("false")]
        public bool Retired { get; set; }

        public int Role { get; set; }

        //public ICollection<Feedback> Feedbacks { get; set; }

        //public ICollection<PolicyRequest> PolicyRequests { get; set; }
        
        //public ICollection<PolicyEmployee> PolicyEmployees { get; set; }      
               
        // public ICollection<Notification> Notifications { get; set; }
    }
}
