using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Api.Providers;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;

namespace Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : SuperController<User>
    {
        public UsersController(MyContext context ) : base(context)
        { }

        [HttpGet("{startIndex}/{pageSize}/{sortBy}/{sortDir}/*{params}*/")]
        public async Task<IActionResult> GetAll(int startIndex, int pageSize, string sortBy, string sortDir /*{params2}*/)
        {
            var q = _context.Users
                /*{whereClause}*/
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