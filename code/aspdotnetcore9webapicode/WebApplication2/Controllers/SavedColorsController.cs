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
    [Route("api/savedcolors")]
    [ApiController]
    public class SavedColorsController : ControllerBase
    {
        private readonly Db _context;

        public SavedColorsController(Db context)
        {
            _context = context;
        }

        // GET: api/SavedColors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SavedColor>>> GetSavedColor()
        {
            return await _context.SavedColor.ToListAsync();
        }

        // GET: api/SavedColors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SavedColor>> GetSavedColor(Guid id)
        {
            var savedColor = await _context.SavedColor.FindAsync(id);

            if (savedColor == null)
            {
                return NotFound();
            }

            return savedColor;
        }

        // PUT: api/SavedColors/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSavedColor(Guid id, SavedColor savedColor)
        {
            if (id != savedColor.Id)
            {
                return BadRequest();
            }

            _context.Entry(savedColor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SavedColorExists(id))
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

        // POST: api/SavedColors
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SavedColor>> PostSavedColor(SavedColor savedColor)
        {
            savedColor.CreatedAt = DateTime.Now;
            savedColor.UpdatedAt = DateTime.Now;
            _context.SavedColor.Add(savedColor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSavedColor", new { id = savedColor.Id }, savedColor);
        }

        // DELETE: api/SavedColors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSavedColor(Guid id)
        {
            var savedColor = await _context.SavedColor.FindAsync(id);
            if (savedColor == null)
            {
                return NotFound();
            }

            _context.SavedColor.Remove(savedColor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SavedColorExists(Guid id)
        {
            return _context.SavedColor.Any(e => e.Id == id);
        }
    }
}
