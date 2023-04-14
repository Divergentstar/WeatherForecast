import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { WeatherForecastActionTypes, SetWeatherForecast, LoadWeatherForecast } from './weather-forecast.actions';
import { WeatherForecastState } from './weather-forecast.reducer';
import { SignalRService } from '../../shared/services/signalr.service';
import { WeatherForecastService } from '../shared/services/weather-forecast.service';

@Injectable()
export class WeatherForecastEffects {
  constructor(
    private actions: Actions,
    private signalRService: SignalRService,
    private service: WeatherForecastService,
    private store: Store<WeatherForecastState>
  ) {}

  startWeatherForecast = createEffect(() =>
    this.actions.pipe(
      ofType(WeatherForecastActionTypes.StartWeatherForecast),
      switchMap(() => {
        this.signalRService.initialiseConnection('weather-forecast');
        this.signalRService.registerProgressListener();

        return this.service.startWeatherForecast()
          .pipe(map((result) => {
            if (result && result.success) {
              this.signalRService.registerDataListener(result.result, this.service.weatherForecast$);
            }

            return new LoadWeatherForecast();
          }));
      })
    )
  );
  loadWeatherForecast = createEffect(() =>
    this.actions.pipe(
      ofType(WeatherForecastActionTypes.LoadWeatherForecast),
      switchMap(() => this.service.getWeatherForecast()
        .pipe(map((weatherForecast) => new SetWeatherForecast(weatherForecast))))
    )
  );
}
