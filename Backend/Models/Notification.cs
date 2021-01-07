using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace HealthInsuranceWebServer.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        [ForeignKey("Admin")]
        public string AdminId { get; set; }
        public Admin Admin { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public bool Status { get; set; }
    
        public bool IsActivity { get; set; }
    }
}
