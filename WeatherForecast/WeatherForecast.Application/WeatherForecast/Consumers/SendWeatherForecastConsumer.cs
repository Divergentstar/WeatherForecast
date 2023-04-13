using MassTransit;
using Microsoft.AspNetCore.SignalR;
using WeatherForecast.Application.WeatherForecast.Services;
using WeatherForecast.Domain.Common.Entities;
using WeatherForecast.Domain.WeatherForecast.Entities;

namespace WeatherForecast.Application.WeatherForecast.Consumers
{
    public class SendWeatherForecastConsumer : IConsumer<SendWeatherForecast>
    {
        private readonly IWeatherForecastService _service;
        private readonly IHubContext<WeatherForecastHub> _hub;

        public SendWeatherForecastConsumer(IWeatherForecastService service, IHubContext<WeatherForecastHub> hub)
        {
            _hub = hub;
            _service = service;
        }

        public async Task Consume(ConsumeContext<SendWeatherForecast> context)
        {
            var message = context.Message;
            var weatherForecast = await _service.GetWeatherForecastAsync();
            await _hub.Clients.All.SendAsync(message.Method, weatherForecast);
        }
    }
}
