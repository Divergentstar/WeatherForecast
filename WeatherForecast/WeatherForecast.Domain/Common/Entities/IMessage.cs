namespace WeatherForecast.Domain.Common.Entities
{
    public interface IMessage
    {
        string Method { get; init; }
    }
}
