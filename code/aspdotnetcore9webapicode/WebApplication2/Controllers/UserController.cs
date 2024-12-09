using Microsoft.AspNetCore.Mvc;
using WebApplication2.Data.Models;
using WebApplication2.Data.Database;
using Microsoft.EntityFrameworkCore;
namespace WebApplication2.Controllers
{
    [Route("/api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly Db database;
        public UserController(Db database) {
            this.database = database;
        }

        [HttpGet]
        public IActionResult All()
        {
            try
            {
                var users = database.Users.ToList();
                if (users != null)
                {
                    return Ok(users);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            try
            {
              var user = database.Users.Find(id);
                if (user != null)
                {
                    return Ok(user);
                }
                else
                {
                    return NotFound();

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<User> Add([FromBody] User user)
        {
            try
            {
                if (user != null)
                {
                    return BadRequest();
                }
                database.Users.Add(user);
                database.SaveChanges();
                return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{id}")]
        public ActionResult<User> Edit([FromRoute] Guid id , [FromBody] User userEdited)
        {
            try
            {
                var userFind = database.Users.Find(id);
                if (userFind != null) 
                {
                    userFind.Name = userEdited.Name;
                    userFind.Email = userEdited.Email;
                    userFind.Password = userEdited.Password;
                    userFind.Role = userEdited.Role;
                    userFind.UpdatedAt = DateTime.Now;
                    database.SaveChanges();
                    return NoContent(); 
                }
                return NotFound();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public ActionResult Delete([FromRoute] Guid id)
        {
            try
            {
                var user = database.Users.Find(id);
                if (user == null)
                {
                    return NotFound();
                }
                database.Users.Remove(user);
                database.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
