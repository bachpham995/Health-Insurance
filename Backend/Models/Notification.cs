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

        [ForeignKey("FromUser"), Column(Order = 0)]
        public int? FromUserId { get; set; }
        public Employee FromUser { get; set; }

        [ForeignKey("ToUser"), Column(Order = 1)]
        public int? ToUserId { get; set; }
        public Employee ToUser { get; set; }

        [Column(TypeName = "text")]
        public string Description { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public bool Status { get; set; }
    
        public int Type { get; set; }

        public int RelatedId { get; set;  }

        public string RelatedType { get; set; }

    }
}
