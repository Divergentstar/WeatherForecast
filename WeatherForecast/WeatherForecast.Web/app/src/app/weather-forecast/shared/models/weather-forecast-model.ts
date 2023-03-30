export class WeatherForecastModel {
  public date: Date;
  public temperatureC!: number;
  public temperatureF!: number;
  public summary?: string;

  constructor(init?: Partial<WeatherForecastModel>) {
    Object.assign(this, init);
    this.date = init && init.date ? new Date(init.date) : new Date();
  }
}
