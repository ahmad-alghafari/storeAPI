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
    [Route("api/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly Db database;
        private readonly IHostEnvironment hostEnvironment;

        public ImagesController(Db context , IHostEnvironment hostEnvironment)
        {
            database = context;
            this.hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages()
        {
            return await database.Images.OrderByDescending(c => c.UpdatedAt).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(Guid id)
        {
            var image = await database.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(Guid id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }
            image.UpdatedAt = DateTime.Now;
            database.Entry(image).State = EntityState.Modified;

            try
            {
                await database.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
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
        public async Task<ActionResult<Image>> PostImage(Uploadimage form)
        {
            if (form == null || form.file == null || form.productId == Guid.Empty)
            {
                return BadRequest("Invalid input data.");
            }
            try
            {
                //string uploads = Path.Combine("https://127.0.0.1:7276/", "uploads");
                string uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(uploads))
                {
                    Directory.CreateDirectory(uploads); // Create directory if it doesn't exist
                }

                string filename = Path.GetRandomFileName() + Guid.NewGuid().ToString() + Path.GetExtension(form!.file.FileName);
                string fullpath = Path.Combine(uploads, filename);

                using (var stream = new FileStream(fullpath, FileMode.Create))
                {
                    await form.file.CopyToAsync(stream);
                }

                string webPath = $"/uploads/{filename}";
                Image image = new Image
                {
                    ProductId = form!.productId,
                    Path = webPath,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };

                database.Images.Add(image);
                await database.SaveChangesAsync();

                return CreatedAtAction("GetImage", new { id = image.Id }, image);

            }
            catch (IOException e)
            {
                return StatusCode(500, $"Error saving image: {e.Message}");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Unexpected error occurred : {e.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(Guid id)
        {
            try
            {
                var image = await database.Images.FindAsync(id);

                if (image == null)
                {
                    return NotFound("Image not found.");
                }

                string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", image.Path.TrimStart('/'));

                Console.WriteLine($"Physical file path: {filePath}");
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath); // Delete the file
                }


                database.Images.Remove(image);
                await database.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"Error deleting image: {e.Message}");
            }
        }

        private bool ImageExists(Guid id)
        {
            return database.Images.Any(e => e.Id == id);
        }
    }
}
