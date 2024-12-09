using Microsoft.EntityFrameworkCore;
using WebApplication2.Data.Models;


namespace WebApplication2.Data.Database
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options) : base(options) { }
        public DbSet<User> Users { get; set; }

        public DbSet<Brand> Brands { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Warranty> Warranty { get; set; }

        public DbSet<Detail> Details { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<ProductTag> ProductTags { get; set; }

        public DbSet<Color> Colors { get; set; }

        public DbSet<SavedColor> SavedColor { get; set; }
    }
}
