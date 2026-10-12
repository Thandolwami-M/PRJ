using Microsoft.EntityFrameworkCore;
using AntiSleepGlasses.API_.Models;

namespace AntiSleepGlasses.API_.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<DrowsinessEvent> DrowsinessEvents { get; set; }
        public DbSet<Feedback> Feedback { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DrowsinessEvent>()
                .HasOne(e => e.Feedback)
                .WithOne(f => f.Event)
                .HasForeignKey<Feedback>(f => f.EventID);
        }
    }
}
