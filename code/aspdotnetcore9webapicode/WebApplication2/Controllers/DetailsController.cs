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
    [Route("api/details")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly Db database;

        public DetailsController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Detail>>> GetDetails()
        {
            return await database.Details.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Detail>> GetDetail(Guid id)
        {
            var detail = await database.Details.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            return detail;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetail(Guid id, Detail detail)
        {
            if (id != detail.Id)
            {
                return BadRequest();
            }

            detail.UpdatedAt = DateTime.Now;
            database.Entry(detail).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }


            return Ok(detail);
        }

        [HttpPost]
        public async Task<ActionResult<Detail>> PostDetail(Detail detail)
        {
            detail.CreatedAt = DateTime.Now;
            detail.UpdatedAt = DateTime.Now;
            database.Details.Add(detail);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetDetail", new { id = detail.Id }, detail);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetail(Guid id)
        {
            var detail = await database.Details.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            database.Details.Remove(detail);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool DetailExists(Guid id)
        {
            return database.Details.Any(e => e.Id == id);
        }
    }
}
