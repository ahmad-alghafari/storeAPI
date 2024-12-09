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
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly Db database;

        public CategoriesController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await database.Categories.OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        [HttpGet("count/{count}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories(int count = 25)
        {
            var categories = await database.Categories
                                           .Take(count)
                                           .OrderByDescending(c => c.CreatedAt)
                                           .ToListAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(Guid id)
        {
            var category = await database.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(Guid id, Category category)
        {
            try
            {
                if (id != category.Id)
                {           
                    return BadRequest();
                }

                var categoryData = await database.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (categoryData == null)
                {
                    return NotFound();
                }
                categoryData.Name = category.Name;
                categoryData.Description = category.Description;
                categoryData.UpdatedAt = DateTime.Now;
                await database.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
              return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            category.CreatedAt = DateTime.Now;
            category.UpdatedAt = DateTime.Now;
            category.Id = Guid.NewGuid();
            database.Categories.Add(category);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.Id }, category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var category = await database.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            database.Categories.Remove(category);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoryExists(Guid id)
        {
            return database.Categories.Any(e => e.Id == id);
        }
    }
}
