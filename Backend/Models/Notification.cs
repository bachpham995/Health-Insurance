using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Notification
    {
        [Key]
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

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
    }
}
