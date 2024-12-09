using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data.Database;
using WebApplication2.Data.Models;

namespace WebApplication2.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Db database;
        private readonly IHostEnvironment hostEnvironment;

        public ProductsController(Db context , IHostEnvironment hostEnvironment)
        {
            database = context;
            this.hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Getproducts()
        {
            return await database.Products.Include(p => p.Brand).Include(p => p.Images).Include(p => p.Category).Include(p => p.Details).Include(p => p.Colors).Include(p => p.Tags).ThenInclude(p=>p.Tag).OrderByDescending(c => c.UpdatedAt).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(Guid id)
        {
            var product = await database.Products.Include(p => p.Brand).Include(p => p.Images).Include(p => p.Details).Include(p => p.Category).Include(p=> p.Colors).Include(p => p.Tags).ThenInclude(p => p.Tag).FirstOrDefaultAsync(p=>p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        

        [HttpGet("count/{count}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetCategories(int count = 25)
        {
            var products = await database.Products
                                           .Take(count).Include(p => p.Brand).Include(p => p.Images).Include(p => p.Details).Include(p => p.Colors).Include(p => p.Category).Include(p => p.Tags).ThenInclude(p => p.Tag)
                                           .OrderByDescending(c => c.UpdatedAt)
                                           .ToListAsync();
            return Ok(products);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(Guid id, Product product)
        {

            if (id != product.Id)   
            {
                return BadRequest();
            }
            product.UpdatedAt = DateTime.Now;
            database.Entry(product).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var updatedProduct = await database.Products.FindAsync(id);
            return Ok(updatedProduct);
        }

        [HttpPut("{id}/{attr}/{status}")]
        public async Task<IActionResult> PutProductStatus(Guid id, string status , string attr , Product product)
        {

            if (status != "true" && status != "false" )
            {

                return BadRequest();
            }
            if (id != product.Id)
            {
                return BadRequest();
            }

            switch (attr)
            {
                case "show":
                    product.Show = status;
                    break;
                case "new":
                    product.New = status;
                    break;
                case "available": 
                    product.Availability = status;
                    break;
                default:
                    return BadRequest();
            }
            product.UpdatedAt = DateTime.Now;
            database.Entry(product).State = EntityState.Modified;
            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var updatedProduct = await database.Products.FindAsync(id);
            return Ok(updatedProduct);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            product.CreatedAt = DateTime.Now;
            product.UpdatedAt = DateTime.Now;

            database.Products.Add(product);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var product = await database.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            database.Products.Remove(product);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(Guid id)
        {
            return database.Products.Any(e => e.Id == id);
        }
    }
}
