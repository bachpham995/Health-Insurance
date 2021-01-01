using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        public string Title { get; set; }
    
        public string Content { get; set; }
        
        public DateTime Date { get; set; }

        public string Response { get; set; }

        public Employee Employee { get; set; }

        public string EmployeeId { get; set; }
    }
}
