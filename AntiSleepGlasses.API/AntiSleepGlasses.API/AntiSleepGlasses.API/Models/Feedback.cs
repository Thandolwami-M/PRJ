using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace AntiSleepGlasses.API_.Models
{
    public class Feedback
    {
        public int FeedbackID { get; set; }
        public string Comments { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime DateSubmitted { get; set; } = DateTime.UtcNow;

        public int DriverID { get; set; }

        [JsonIgnore]
        [ValidateNever]
        public Driver Driver { get; set; } = null!;

        public int? EventID { get; set; }

        [JsonIgnore]
        [ValidateNever]
        public DrowsinessEvent? Event { get; set; }
    }
}