import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherForecastState, WEATHER_FORECAST_FEATURE_KEY } from './weather-forecast.reducer';

const getWeatherForecastState = createFeatureSelector<WeatherForecastState>(WEATHER_FORECAST_FEATURE_KEY);

const getWeatherForecast = createSelector(
  getWeatherForecastState,
  (state: WeatherForecastState) => state.weatherForecast
);

export const weatherForecastQuery = {
  getWeatherForecast
};
