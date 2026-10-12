using static System.Collections.Specialized.BitVector32;

namespace AntiSleepGlasses.API_.Models
{
    public class Driver
    {
        public int DriverID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string VehicleType { get; set; } = string.Empty;
        public DateTime DateRegistered { get; set; } = DateTime.UtcNow;

        // Navigation property: one driver can have many sessions
        public List<Session> Sessions { get; set; } = new();
    }
}
