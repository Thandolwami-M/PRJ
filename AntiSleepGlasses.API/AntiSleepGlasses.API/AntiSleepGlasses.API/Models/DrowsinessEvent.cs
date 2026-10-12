using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace AntiSleepGlasses.API_.Models
{
    public class DrowsinessEvent
    {
        [Key]
        public int EventID { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public int SeverityLevel { get; set; }
        public string AlertTypeTriggered { get; set; } = string.Empty;
        public int ResponseTimeMs { get; set; }

        public int SessionID { get; set; }

        [JsonIgnore]
        [ValidateNever]
        public Session Session { get; set; } = null!;

        [JsonIgnore]
        [ValidateNever]
        public Feedback? Feedback { get; set; }
    }
}