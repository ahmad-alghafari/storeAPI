using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Data.Models
{
    public class Color
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]

        public Guid? ProductId { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        [StringLength(5)]
        public string? Available { get; set; }

        [Required]
        public string? Value { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }


    }
}
