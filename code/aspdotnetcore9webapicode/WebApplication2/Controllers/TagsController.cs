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
    [Route("api/tags")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly Db database;

        public TagsController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            return await database.Tags.OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        [HttpGet("count/{count}")]
        public async Task<ActionResult<IEnumerable<Tag>>> GetCategories(int count = 25)
        {
            var tags = await database.Tags
                                           .Take(count)
                                           .OrderByDescending(c => c.CreatedAt)
                                           .ToListAsync();
            return Ok(tags);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tag>> GetTag(Guid id)
        {
            var tag = await database.Tags.FindAsync(id);

            if (tag == null)
            {
                return NotFound();
            }

            return tag;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTag(Guid id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            database.Entry(tag).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
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
        public async Task<ActionResult<Tag>> PostTag(Tag tag)
        {
            tag.CreatedAt = DateTime.Now;
            tag.UpdatedAt = DateTime.Now;

            database.Tags.Add(tag);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetTag", new { id = tag.Id }, tag);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(Guid id)
        {
            var tag = await database.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            database.Tags.Remove(tag);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool TagExists(Guid id)
        {
            return database.Tags.Any(e => e.Id == id);
        }
    }
}
