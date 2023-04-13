using Autofac;
using MassTransit;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using WeatherForecast.Application;
using WeatherForecast.Application.Common.Consumers;
using WeatherForecast.Application.WeatherForecast.Consumers;
using WeatherForecast.Common.Configuration;
using WeatherForecast.Domain.Common.Entities;

namespace WeatherForecast.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule<ApplicationModule>();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<WeatherForecastConfig>(Configuration.GetSection("WeatherForecastConfig"));
            services.TryAddSingleton<IWeatherForecastConfig>(sp => sp.GetRequiredService<IOptions<WeatherForecastConfig>>().Value);

            var weatherForecastConfig = Configuration.GetSection(nameof(WeatherForecastConfig)).Get<WeatherForecastConfig>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .WithOrigins("http://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
            services.AddControllers();
            services.AddSignalR();
            services.AddMassTransit(x =>
            {
                x.AddConsumer<SendProgressMessageConsumer>();
                x.AddConsumer<SendWeatherForecastConsumer>();
                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host("localhost", "/");
                    //cfg.Host(new Uri(weatherForecastConfig.RabbitMQUri));
                    cfg.ConfigureEndpoints(context);
                });
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors("CorsPolicy");

            app.UseEndpoints(endpoints =>
            {
                 endpoints.MapControllerRoute(
                     name: "default",
                     pattern: "{controller=Home}/{action=Register}/{id?}");
                 endpoints.MapHub<WeatherForecastHub>("/weather-forecast", options =>
                 {
                     options.Transports = HttpTransportType.ServerSentEvents;
                 });
            });
        }
    }
}
