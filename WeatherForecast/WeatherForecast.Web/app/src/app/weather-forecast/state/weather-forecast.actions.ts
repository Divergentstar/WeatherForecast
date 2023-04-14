import { Action } from '@ngrx/store';
import { WeatherForecastModel } from '../shared/models/weather-forecast-model';

export enum WeatherForecastActionTypes {
  StartWeatherForecast = '[Weather Forecast] Start Weather Forecast',
  LoadWeatherForecast = '[Weather Forecast] Load Weather Forecast',
  SetWeatherForecast = '[Weather Forecast] Set Weather Forecast'
}

export class StartWeatherForecast implements Action {
  readonly type = WeatherForecastActionTypes.StartWeatherForecast;
}
export class LoadWeatherForecast implements Action {
  readonly type = WeatherForecastActionTypes.LoadWeatherForecast;
}
export class SetWeatherForecast implements Action {
  readonly type = WeatherForecastActionTypes.SetWeatherForecast;
  constructor(public payload: WeatherForecastModel[]) {}
}

export type WeatherForecastAction = StartWeatherForecast
| LoadWeatherForecast
| SetWeatherForecast;

export const WeatherForecastActions = {
  StartWeatherForecast,
  LoadWeatherForecast,
  SetWeatherForecast
};
