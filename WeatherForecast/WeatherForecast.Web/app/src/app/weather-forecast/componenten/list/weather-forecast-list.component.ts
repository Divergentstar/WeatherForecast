import { Component, Input } from '@angular/core';
import { WeatherForecastModel } from '../../shared/models/weather-forecast-model';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent {
  @Input() weatherForecast: WeatherForecastModel[] | null = [];
}
