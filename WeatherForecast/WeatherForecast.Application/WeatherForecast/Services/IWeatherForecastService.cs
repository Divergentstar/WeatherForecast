using WeatherForecast.Application.Common.Dto;
using WeatherForecast.Application.WeatherForecast.Dto;

namespace WeatherForecast.Application.WeatherForecast.Services
{
    public interface IWeatherForecastService
    {
        Task<ActionValidationAndDataResultDto<string>> StartWeatherForecastAsync();
        Task<ListResultDto<WeatherForecastDto>> GetWeatherForecastAsync();
    }
}
