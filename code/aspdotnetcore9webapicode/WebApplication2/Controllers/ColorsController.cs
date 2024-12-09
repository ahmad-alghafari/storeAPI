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
    [Route("api/colors")]
    [ApiController]
    public class ColorsController : ControllerBase
    {
        private readonly Db database;

        public ColorsController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Color>>> Getcolors()
        {
            return await database.Colors.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Color>> GetColor(Guid id)
        {
            var color = await database.Colors.FindAsync(id);

            if (color == null)
            {
                return NotFound();
            }

            return color;
        }

       

        [HttpPut("{id}")]
        public async Task<IActionResult> PutColor(Guid id, Color color)
        {
            if (id != color.Id)
            {
                return BadRequest();
            }

            database.Entry(color).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorExists(id))
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
        public async Task<ActionResult<Color>> PostColor(Color color)
        {
            color.CreatedAt = DateTime.Now;
            color.UpdatedAt = DateTime.Now;
            database.Colors.Add(color);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetColor", new { id = color.Id }, color);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColor(Guid id)
        {
            var color = await database.Colors.FindAsync(id);
            if (color == null)
            {
                return NotFound();
            }

            database.Colors.Remove(color);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool ColorExists(Guid id)
        {
            return database.Colors.Any(e => e.Id == id);
        }
    }
}
