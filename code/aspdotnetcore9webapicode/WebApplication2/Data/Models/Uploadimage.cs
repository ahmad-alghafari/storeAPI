using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Data.Models
{
    public class Uploadimage
    {
        [Required]
        public IFormFile file {  get; set; }
        [Required]
        public Guid productId {  get; set; }
    }
}
