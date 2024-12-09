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
    [Route("api/producttags")]
    [ApiController]
    public class ProductTagsController : ControllerBase
    {
        private readonly Db database;

        public ProductTagsController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductTag>>> GetProductTags()
        {
            return await database.ProductTags.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTag>> GetProductTag(Guid id)
        {
            var productTag = await database.ProductTags.FindAsync(id);

            if (productTag == null)
            {
                return NotFound();
            }

            return productTag;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductTag(Guid id, ProductTag productTag)
        {
            if (id != productTag.Id)
            {
                return BadRequest();
            }

            database.Entry(productTag).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTagExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ProductTag>> PostProductTag(ProductTag productTag)
        {
            productTag.UpdatedAt = DateTime.Now;
            productTag.CreatedAt = DateTime.Now;
            database.ProductTags.Add(productTag);
            await database.SaveChangesAsync();

            Tag tag = await database.Tags.FirstOrDefaultAsync(t=>t.Id == productTag.TagId);
            productTag.Tag = tag;
            return CreatedAtAction("GetProductTag", new { id = productTag.Id }, productTag);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductTag(Guid id)
        {
            var productTag = await database.ProductTags.FindAsync(id);
            if (productTag == null)
            {
                return NotFound();
            }

            database.ProductTags.Remove(productTag);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductTagExists(Guid id)
        {
            return database.ProductTags.Any(e => e.Id == id);
        }
    }
}
