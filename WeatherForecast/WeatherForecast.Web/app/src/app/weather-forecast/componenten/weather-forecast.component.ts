import { Component, OnInit } from '@angular/core';
import { WeatherForecastStoreService } from '../shared/services/weather-forecast-store.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weatherForecast = this.store.weatherForecast;

  constructor(private store: WeatherForecastStoreService) { }

  ngOnInit(): void {
    this.store.loadWeatherForecast();
  }
}
