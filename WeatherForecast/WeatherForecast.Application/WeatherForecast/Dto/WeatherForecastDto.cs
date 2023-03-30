namespace WeatherForecast.Application.WeatherForecast.Dto
{
    public class WeatherForecastDto
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC * (9 / 5));

        public string? Summary { get; set; }
    }
}
