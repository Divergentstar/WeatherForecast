import { Component, Input } from '@angular/core';
import { MessageTypeEnum } from '../../../shared/models/enums';
import { WeatherForecastModel } from '../../shared/models/weather-forecast-model';
import { ProgressMessageModel } from '../../../shared/models/progress-message-model';

@Component({
  selector: 'app-weather-forecast-list',
  templateUrl: './weather-forecast-list.component.html',
  styleUrls: ['./weather-forecast-list.component.css']
})
export class WeatherForecastListComponent {
  @Input() progressMessage: ProgressMessageModel | null = null;
  @Input() weatherForecast: WeatherForecastModel[] | null = [];

  public messageTypeProgress = MessageTypeEnum.Progress;
}
