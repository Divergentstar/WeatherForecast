import { WeatherForecastModel } from '../shared/models/weather-forecast-model';
import { WeatherForecastAction, WeatherForecastActionTypes } from './weather-forecast.actions';

export const WEATHER_FORECAST_FEATURE_KEY = 'ramingFeature';

export interface WeatherForecastState {
  weatherForecast: WeatherForecastModel[];
}

export interface RamingPartialState {
  readonly [WEATHER_FORECAST_FEATURE_KEY]: WeatherForecastState;
}

export const weatherForecastInitialState: WeatherForecastState = {
  weatherForecast: []
};

export function weatherForecastReducer(
  state: WeatherForecastState | undefined,
  action: WeatherForecastAction
): WeatherForecastState {
  switch (action.type) {
    case WeatherForecastActionTypes.SetWeatherForecast: {
      state = {
        ...state,
        weatherForecast: action.payload
      };
      break;
    }
  }
  return state as WeatherForecastState;
}
