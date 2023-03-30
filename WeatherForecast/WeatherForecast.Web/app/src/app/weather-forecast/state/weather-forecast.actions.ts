import { Action } from '@ngrx/store';
import { WeatherForecastModel } from '../shared/models/weather-forecast-model';

export enum WeatherForecastActionTypes {
  LoadWeatherForecast = '[Weather Forecast] Load Weather Forecast',
  SetWeatherForecast = '[Weather Forecast] Set Weather Forecast'
}

export class LoadWeatherForecast implements Action {
  readonly type = WeatherForecastActionTypes.LoadWeatherForecast;
}
export class SetWeatherForecast implements Action {
  readonly type = WeatherForecastActionTypes.SetWeatherForecast;
  constructor(public payload: WeatherForecastModel[]) {}
}

export type WeatherForecastAction = LoadWeatherForecast
| SetWeatherForecast;

export const WeatherForecastActions = {
  LoadWeatherForecast,
  SetWeatherForecast
};
