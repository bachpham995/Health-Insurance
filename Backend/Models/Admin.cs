using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInsuranceWebServer.Models
{
    public class Admin
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [StringLength(50, MinimumLength = 2)]
        public string Username { get; set; }

        [DataType(DataType.Password)]
        [StringLength(50, MinimumLength = 2)]
        public string Password { get; set; }

        
    }
}
