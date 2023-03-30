using MassTransit;
using WeatherForecast.Application.Common.Dto;
using WeatherForecast.Application.WeatherForecast.Dto;
using WeatherForecast.Domain.WeatherForecast.Entities;

namespace WeatherForecast.Application.WeatherForecast.Services
{
    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly Random _random = new Random();
        private readonly IPublishEndpoint _publishEndpoint;
        private readonly List<string> _summaries = new List<string>
        {
            "Freezing",
            "Bracing",
            "Chilly",
            "Cool",
            "Mild",
            "Warm",
            "Balmy",
            "Hot",
            "Sweltering",
            "Scorching"
        };
        private readonly SendWeatherForecast _sendWeatherForecast = new SendWeatherForecast();

        public WeatherForecastService(IPublishEndpoint publishEndpoint)
        {
            _publishEndpoint = publishEndpoint;
        }

        public async Task<ActionValidationAndDataResultDto<string>> StartWeatherForecastAsync()
        {
            var result = new ActionValidationAndDataResultDto<string>
            {
                Success = true,
                Errors = new List<string>(),
                Warnings = new List<string>()
            };

            try
            {
                await _publishEndpoint.Publish(_sendWeatherForecast);
                result.Result = _sendWeatherForecast.Method;
            }
            catch (Exception exception)
            {
                result.Success = false;
                result.Errors.Add(exception.Message);
            }

            return result;
        }

        public Task<ListResultDto<WeatherForecastDto>> GetWeatherForecastAsync()
        {
            var index = -1;
            var weatherForecast = new ListResultDto<WeatherForecastDto>
            {
                Data = new List<WeatherForecastDto>()
            };

            while (index < 5)
            {
                index++;
                weatherForecast.Data.Add(new WeatherForecastDto
                {
                    Date = DateTime.Today.AddDays(index),
                    TemperatureC = _random.Next(-10, 45),
                    Summary = _summaries[_random.Next(_summaries.Count)]
                });
                Thread.Sleep(TimeSpan.FromSeconds(10));
            }

            return Task.FromResult(weatherForecast);
        }
    }
}
