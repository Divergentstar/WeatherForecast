using WeatherForecast.Domain.Common.Entities;

namespace WeatherForecast.Domain.WeatherForecast.Entities
{
    public class SendWeatherForecast : IMessage
    {
        public string Method { get; init; } = "SendWeatherForecast";
    }
}
