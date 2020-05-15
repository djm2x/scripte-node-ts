using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using Services;
using System.Text.Encodings.Web;
using Api.Providers;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : SuperController<User>
    {
        public UsersController(MyContext context ) : base(context)
        { }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/{firstName}/{lastName}")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir, string firstName, string lastName)
        {
            // int i = typeof(T).FullName.LastIndexOf('.');
            // string tableName = typeof(T).FullName.Substring(i + 1) + "s";
            var q = _context.Users
                .Where(e => firstName == "*" ? true : e.FirstName.ToLower().Contains(firstName.ToLower()))
                .Where(e => lastName == "*" ? true : e.LastName.ToLower().Contains(lastName.ToLower()))
                ;

            int count = await q.CountAsync();

            var list = await q.OrderByName<User>(sortBy, sortDir == "desc")
                .Skip(startIndex)
                .Take(pageSize)
                .ToListAsync()
                ;

            return Ok(new { list = list, count = count });
        }

    }
}