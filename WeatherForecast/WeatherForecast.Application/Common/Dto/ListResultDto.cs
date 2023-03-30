namespace WeatherForecast.Application.Common.Dto
{
    public class ListResultDto<T> where T : class
    {
        public int Total => Data != null && Data.Any() ? Data.Count : 0;
        public IList<T>? Data { get; set; }
    }
}
