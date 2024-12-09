using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebApplication2.Data.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        [Required]
        [StringLength(200)]
        public string? Description { get; set; }

        [Required]
        public Guid BrandId {  get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        public int? Price { get; set; }

        [Required]
        [StringLength(5)]
        public string? Availability { get; set; }

        [Required]
        [StringLength(5)]
        public string? New {  get; set; }

        [Required]
        [StringLength(5)]
        public string? Show { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Image>? Images { get; set; }
        public ICollection<Warranty>? warranty { get; set; } // scalable to futer

        public ICollection<Detail>? Details { get; set; }

        public ICollection<ProductTag>? Tags { get; set; }

        public ICollection<Color>? Colors { get; set; }

        public Brand? Brand { get; set; }

        public Category? Category { get; set; }
    }
}
