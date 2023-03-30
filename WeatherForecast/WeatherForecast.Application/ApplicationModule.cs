using Autofac;
using WeatherForecast.Application.WeatherForecast.Services;

namespace WeatherForecast.Application
{
    public class ApplicationModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<WeatherForecastService>().As<IWeatherForecastService>();
        }
    }
}
