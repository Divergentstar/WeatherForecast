namespace WeatherForecast.Domain.Common.Entities;
public class SendProgressMessage : IMessage
{
    public ProgressMessage Message { get; set; }
    public string Method { get; init; } = "SendProgressMessage";
}
