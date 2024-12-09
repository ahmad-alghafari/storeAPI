using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Data.Models
{
    public class Warranty
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid ProductId { get; set; }

        [Required]
        public DateTime? WarrantyPeriod { get; set; }

        [Required]
        public string? ServiceProvider { get; set; }

        [Required]
        [StringLength(255)]
        public string? Address { get; set; } 

        [Required]
        [StringLength(255)]
        public string? Url { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public Product? Product { get; set; }

    }
}
