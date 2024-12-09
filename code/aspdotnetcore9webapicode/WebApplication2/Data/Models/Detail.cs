using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Data.Models
{
    public class Detail
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Value { get; set; } 
        
        public Guid? ProductId { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get;  set; }

    }
}
