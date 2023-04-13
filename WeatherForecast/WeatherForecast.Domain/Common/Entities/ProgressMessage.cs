namespace WeatherForecast.Domain.Common.Entities
{
    public enum MessageType
    {
        Error,
        Warning,
        Progress
    }

    public class ProgressMessage
    {
        public string Context { get; set; }
        public string Message { get; set; }
        public MessageType MessageType { get; set; }
    }
}
