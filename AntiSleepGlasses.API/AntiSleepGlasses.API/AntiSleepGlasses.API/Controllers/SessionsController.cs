using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AntiSleepGlasses.API_.Data;
using AntiSleepGlasses.API_.Models;

namespace AntiSleepGlasses.API_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SessionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SessionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Session>>> GetSessions()
        {
            return await _context.Sessions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Session>> GetSession(int id)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
            {
                return NotFound();
            }

            return session;
        }

        [HttpPost]
        public async Task<ActionResult<Session>> PostSession(Session session)
        {
            _context.Sessions.Add(session);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetSession),
                new { id = session.SessionID },
                session
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSession(int id, Session session)
        {
            var existingSession = await _context.Sessions.FindAsync(id);

            if (existingSession == null)
            {
                return NotFound();
            }

            existingSession.EndTime = session.EndTime;
            existingSession.TotalAlerts = session.TotalAlerts;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
