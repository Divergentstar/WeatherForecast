import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { WeatherForecastEffects } from './state/weather-forecast.effects';
import { WeatherForecastComponent } from './componenten/weather-forecast.component';
import { WeatherForecastListComponent } from './componenten/list/weather-forecast-list.component';
import { weatherForecastInitialState, weatherForecastReducer, WEATHER_FORECAST_FEATURE_KEY } from './state/weather-forecast.reducer';

@NgModule({
  declarations: [
    WeatherForecastComponent,
    WeatherForecastListComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      WEATHER_FORECAST_FEATURE_KEY,
      weatherForecastReducer,
      { initialState: { ...weatherForecastInitialState }}
    ),
    EffectsModule.forFeature([WeatherForecastEffects])
  ],
  providers: []
})
export class WeatherForecastModule { }
