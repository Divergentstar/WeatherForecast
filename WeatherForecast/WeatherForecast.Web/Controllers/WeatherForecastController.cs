using Microsoft.AspNetCore.Mvc;
using WeatherForecast.Application.Common.Dto;
using WeatherForecast.Application.WeatherForecast.Services;

namespace WeatherForecast.Web.Controllers
{
    [ApiController]
    [Route("api/weather-forecast")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IWeatherForecastService _service;

        public WeatherForecastController(IWeatherForecastService service)
        {
            _service = service;
        }

        [HttpGet("start")]
        public async Task<ActionResult<ActionValidationAndDataResultDto<string>>> Start()
        {
            var result = await _service.StartWeatherForecastAsync();

            return Ok(result);
        }
    }
}