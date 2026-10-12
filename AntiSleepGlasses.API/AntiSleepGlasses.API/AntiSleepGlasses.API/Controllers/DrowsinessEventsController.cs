using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AntiSleepGlasses.API_.Data;
using AntiSleepGlasses.API_.Models;

namespace AntiSleepGlasses.API_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrowsinessEventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DrowsinessEventsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/drowsinessevents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DrowsinessEvent>>> GetEvents()
        {
            return await _context.DrowsinessEvents.ToListAsync();
        }

        // GET: api/drowsinessevents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DrowsinessEvent>> GetEvent(int id)
        {
            var drowsinessEvent = await _context.DrowsinessEvents.FindAsync(id);

            if (drowsinessEvent == null)
            {
                return NotFound();
            }

            return drowsinessEvent;
        }

        // POST: api/drowsinessevents
        [HttpPost]
        public async Task<ActionResult<DrowsinessEvent>> PostEvent(DrowsinessEvent drowsinessEvent)
        {
            _context.DrowsinessEvents.Add(drowsinessEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = drowsinessEvent.EventID }, drowsinessEvent);
        }
    }
}