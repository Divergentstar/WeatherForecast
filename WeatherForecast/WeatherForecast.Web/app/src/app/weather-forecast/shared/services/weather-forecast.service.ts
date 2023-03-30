import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { WeatherForecastModel } from '../models/weather-forecast-model';
import { ApiService } from '../../../shared/services/api.service';
import { BaseService } from '../../../shared/services/base.service';
import { ApiDataResponseModel } from '../../../shared/models/api-data-response-model';
import { ListResultModel } from 'src/app/shared/models/list-result-model';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService extends BaseService {
  constructor(private apiService: ApiService) {
    super();
  }

  public startWeatherForecast(): Observable<ApiDataResponseModel<string>> {
    return this.apiService.get<ApiDataResponseModel<string>>('weather-forecast/start')
      .pipe(
        tap(result => {
          this.handleApiResponse(
            result,
            'Weather forecast started.',
            'Weather forecast not started. There are validation errors.',
            'Weather forecast not started.'
          );
        }),
        share()
      );
  }

  public getWeatherForecast(weatherForecast$: Observable<ListResultModel<WeatherForecastModel>>): Observable<WeatherForecastModel[]> {
    return weatherForecast$.pipe(map((weatherForecast) => weatherForecast.data.map((m) => new WeatherForecastModel(m))));
  }
}
