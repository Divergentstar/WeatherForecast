import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { WeatherForecastActionTypes, SetWeatherForecast } from './weather-forecast.actions';
import { WeatherForecastState } from './weather-forecast.reducer';
import { SignalRService } from '../../shared/services/signalr.service';
import { ListResultModel } from '../../shared/models/list-result-model';
import { WeatherForecastModel } from '../shared/models/weather-forecast-model';
import { WeatherForecastService } from '../shared/services/weather-forecast.service';

@Injectable()
export class WeatherForecastEffects {
  constructor(
    private actions: Actions,
    private signalRService: SignalRService,
    private service: WeatherForecastService,
    private store: Store<WeatherForecastState>
  ) {}

  loadWeatherForecast = createEffect(() =>
    this.actions.pipe(
      ofType(WeatherForecastActionTypes.LoadWeatherForecast),
      switchMap(() => {
        console.log('start weather forecast');
        this.signalRService.buildConnection('weather-forecast');
        this.signalRService.startConnection();

        return this.service.startWeatherForecast();
      }),
      switchMap((result) => {
        if (result && result.success) {
          const weatherForecast$ = this.signalRService.registerListener<ListResultModel<WeatherForecastModel>>(result.result);

          return this.service.getWeatherForecast(weatherForecast$)
            .pipe(map((weatherForecast) => {
              console.log('stop weather forecast');
              this.signalRService.stopConnection();
              return new SetWeatherForecast(weatherForecast);
            }));
        } else {
          this.signalRService.stopConnection();

          return [];
        }
      })
    )
  );
}
