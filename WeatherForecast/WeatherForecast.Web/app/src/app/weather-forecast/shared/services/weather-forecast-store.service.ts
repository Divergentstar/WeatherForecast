import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherForecastModel } from '../models/weather-forecast-model';
import { StartWeatherForecast, LoadWeatherForecast, SetWeatherForecast } from '../../state/weather-forecast.actions';
import { WeatherForecastState } from '../../state/weather-forecast.reducer';
import { weatherForecastQuery } from '../../state/weather-forecast.selectors';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastStoreService {
  weatherForecast = this.store.select(weatherForecastQuery.getWeatherForecast);

  constructor(private store: Store<WeatherForecastState>) { }

  startWeatherForecast() {
    this.store.dispatch(new StartWeatherForecast());
  }
  loadWeatherForecast() {
    this.store.dispatch(new LoadWeatherForecast());
  }
  setWeatherForecast(model: WeatherForecastModel[]) {
    this.store.dispatch(new SetWeatherForecast(model));
  }
}
