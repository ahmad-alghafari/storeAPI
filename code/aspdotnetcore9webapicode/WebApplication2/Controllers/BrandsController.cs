using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data.Database;
using WebApplication2.Data.Models;

namespace WebApplication2.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly Db database;

        public BrandsController(Db context)
        {
            database = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            return await database.Brands.OrderByDescending(c => c.CreatedAt).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(Guid id)
        {
            var brand = await database.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return brand;
        }
        [HttpGet("count/{count}")]
        public async Task<ActionResult<IEnumerable<Brand>>> GetCategories(int count = 25)
        {
            var Brands = await database.Brands
                                           .Take(count)
                                           .OrderByDescending(c => c.CreatedAt)
                                           .ToListAsync();
            return Ok(Brands);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBrand(Guid id, Brand brand)
        {
            if (id != brand.Id)
            {
                return BadRequest();
            }

            database.Entry(brand).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
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
        public async Task<ActionResult<Brand>> PostBrand(Brand brand)
        {
            brand.CreatedAt = DateTime.Now;
            brand.UpdatedAt = DateTime.Now;
            database.Brands.Add(brand);
            await database.SaveChangesAsync();

            return CreatedAtAction("GetBrand", new { id = brand.Id }, brand);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            var brand = await database.Brands.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }

            database.Brands.Remove(brand);
            await database.SaveChangesAsync();

            return NoContent();
        }

        private bool BrandExists(Guid id)
        {
            return database.Brands.Any(e => e.Id == id);
        }
    }
}
