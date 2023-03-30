namespace WeatherForecast.Application.Common.Dto
{
    /// <summary>
    /// Het validatie resultaat dat teruggegeven wordt na het uitvoeren van een actie
    /// </summary>
    public class ActionValidationResultDto
    {
        /// <summary>
        /// Indicator die aangeeft of de actie succesvol uitgevoerd is.
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// De lijst van foutmeldingen die ingevuld worden als de actie niet succesvol was
        /// </summary>
        public IList<string> Errors { get; set; } = new List<string>();

        /// <summary>
        /// De lijst van waarschuwingen
        /// </summary>
        public IList<string> Warnings { get; set; } = new List<string>();
    }

    /// <summary>
    /// Het validatie en data resultaat dat teruggegeven wordt na het uitvoeren van een actie
    /// </summary>
    public class ActionValidationAndDataResultDto<T> : ActionValidationResultDto
    {
        /// <summary>
        /// Het resultaat van de actie
        /// </summary>
        public T? Result { get; set; }
    }
}
