using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        [Required(ErrorMessage = "Title can't blank!")]
        [MaxLength(255)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Title can't blank!")]
        [Column(TypeName = "text")]
        public string Content { get; set; }

        [Required(ErrorMessage = "Date can't blank!")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Column(TypeName = "text")]
        public string Response { get; set; }

        [DefaultValue("false")]
        public bool Retired { get; set; }

        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
