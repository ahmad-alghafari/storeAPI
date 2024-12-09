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
    [Route("api/warrany")]
    [ApiController]
    public class WarrantiesController : ControllerBase
    {
        private readonly Db database;

        public WarrantiesController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Warranty>>> GetWarranty()
        {
            return await database.Warranty.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Warranty>> GetWarranty(Guid id)
        {
            var warranty = await database.Warranty.FindAsync(id);

            if (warranty == null)
            {
                return NotFound();
            }

            return warranty;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWarranty(Guid id, Warranty warranty)
        {
            if (id != warranty.Id)
            {
                return BadRequest();
            }

            database.Entry(warranty).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WarrantyExists(id))
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
        public async Task<ActionResult<Warranty>> PostWarranty(Warranty warranty)
        {
            database.Warranty.Add(warranty);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetWarranty", new { id = warranty.Id }, warranty);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWarranty(Guid id)
        {
            var warranty = await database.Warranty.FindAsync(id);
            if (warranty == null)
            {
                return NotFound();
            }

            database.Warranty.Remove(warranty);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool WarrantyExists(Guid id)
        {
            return database.Warranty.Any(e => e.Id == id);
        }
    }
}
