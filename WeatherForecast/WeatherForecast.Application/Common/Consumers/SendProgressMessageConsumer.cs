using MassTransit;
using Microsoft.AspNetCore.SignalR;
using WeatherForecast.Domain.Common.Entities;

namespace WeatherForecast.Application.Common.Consumers
{
    public class SendProgressMessageConsumer : IConsumer<SendProgressMessage>
    {
        private readonly IHubContext<WeatherForecastHub> _hub;

        public SendProgressMessageConsumer(IHubContext<WeatherForecastHub> hub)
        {
            _hub = hub;
        }

        public async Task Consume(ConsumeContext<SendProgressMessage> context)
        {
            var message = context.Message;
            await _hub.Clients.All.SendAsync(message.Method, message.Message);
        }
    }
}
