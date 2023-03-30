using Serilog.Events;

namespace WeatherForecast.Common.Configuration
{
    public interface IWeatherForecastConfig
    {
        LogEventLevel Loglevel { get; set; }
        LogEventLevel LoglevelMicrosoft { get; set; }
        string RabbitMQUri { get; set; }
        string RabbitMQMessagesRepositoryPath { get; set; }
        string Omgeving { get; set; }
    }

    public class WeatherForecastConfig : IWeatherForecastConfig
    {
        public LogEventLevel Loglevel { get; set; }
        public LogEventLevel LoglevelMicrosoft { get; set; }
        public string RabbitMQUri { get; set; } = null!;
        public string RabbitMQMessagesRepositoryPath { get; set; } = null!;
        public string Omgeving { get; set; } = null!;
    }
}
