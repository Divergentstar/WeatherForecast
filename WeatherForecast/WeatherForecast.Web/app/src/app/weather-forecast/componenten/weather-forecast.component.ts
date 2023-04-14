import { Component, OnInit } from '@angular/core';
import { ApplicatieStoreService } from '../../shared/services/applicatie-store.service';
import { WeatherForecastStoreService } from '../shared/services/weather-forecast-store.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  weatherForecast = this.store.weatherForecast;
  progressMessage = this.applicatieStore.progressMessage;

  constructor(private store: WeatherForecastStoreService, private applicatieStore: ApplicatieStoreService) { }

  ngOnInit(): void {
    this.store.startWeatherForecast();
  }
}
