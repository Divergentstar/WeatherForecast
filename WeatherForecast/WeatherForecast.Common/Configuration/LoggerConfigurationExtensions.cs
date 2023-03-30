using Serilog;
using Serilog.Events;

namespace WeatherForecast.Common.Configuration
{
    public static class LoggerConfigurationExtensions
    {
        public static LoggerConfiguration MinimumLevel(this LoggerConfiguration configuration, LogEventLevel level)
        {
            switch (level)
            {
                case LogEventLevel.Verbose:
                    return configuration.MinimumLevel.Verbose();
                case LogEventLevel.Debug:
                    return configuration.MinimumLevel.Debug();
                case LogEventLevel.Information:
                    return configuration.MinimumLevel.Information();
                case LogEventLevel.Warning:
                    return configuration.MinimumLevel.Warning();
                case LogEventLevel.Error:
                    return configuration.MinimumLevel.Error();
                case LogEventLevel.Fatal:
                    return configuration.MinimumLevel.Fatal();
                default:
                    return configuration.MinimumLevel.Error();
            }
        }
    }
}
