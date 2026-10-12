using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace AntiSleepGlasses.API_.Models
{
    public class Session
    {
        public int SessionID { get; set; }
        public DateTime StartTime { get; set; } = DateTime.UtcNow;
        public DateTime? EndTime { get; set; }
        public int TotalAlerts { get; set; } = 0;

        public int DriverID { get; set; }

        [JsonIgnore]
        [ValidateNever]
        public Driver Driver { get; set; } = null!;

        [JsonIgnore]
        public List<DrowsinessEvent> Events { get; set; } = new();
    }
}