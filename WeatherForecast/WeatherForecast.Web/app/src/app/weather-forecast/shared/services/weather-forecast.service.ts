import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { ApiService } from '../../../shared/services/api.service';
import { BaseService } from '../../../shared/services/base.service';
import { ApiDataResponseModel } from '../../../shared/models/api-data-response-model';

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
}
