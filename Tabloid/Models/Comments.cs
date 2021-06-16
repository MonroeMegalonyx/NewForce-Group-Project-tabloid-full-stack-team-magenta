using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid.Models
{
    public class Comments
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [DisplayName("Posts")]
        public int PostId { get; set; }

        [Required]
        [DisplayName("UserProfile")]
        public int UserProfileId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Subject { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }
    }
}
