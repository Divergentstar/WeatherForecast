import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiDataResponseModel } from '../models/api-data-response-model';
import { ApiValidatieResultModel } from '../models/api-validatie-result-model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  firstError(error: any): string {
    if (error.status === 400 && error.error && error.error.errors) {
      return error.error.errors[0] as string;
    }
    return '';
  }

  getFormatErrorsObservable(error: any): Observable<ApiValidatieResultModel> {
    return of(this.formatErrors(error));
  }

  formatErrors(error: any): ApiValidatieResultModel {
    if (error.status === 400 && error.error && error.error.errors) {
      const errors: ConcatArray<never>[] = error.error.errors;

      return new ApiValidatieResultModel({
        success: false,
        validatieFouten: [].concat(...Object.values(errors)) // convert object to flattened array
      });
    }
    return new ApiValidatieResultModel({
      success: false,
      validatieFouten: [] // convert object to flattened array
    });
  }

  get<T>(path: string, data: HttpParams = new HttpParams()): Observable<T> {
    return this.httpClient.get<T>(`${environment.api_url}/api/${path}`, { params: data })
      .pipe(catchError(err => this.getFormatErrorsObservable(err)), map(r => r as T));
  }

  getWithValidation<T>(path: string, data: HttpParams = new HttpParams()): Observable<ApiDataResponseModel<T>> {
    return this.httpClient.get<T>(`${environment.api_url}/api/${path}`, { params: data })
      .pipe(
        map(r => new ApiDataResponseModel<T>({
          result: r,
          success: true
        })),
        catchError(err => {
          const response = this.formatErrors(err);
          const dataResponse = new ApiDataResponseModel<T>(response);

          return of(dataResponse);
        }));
  }

  put<T extends ApiValidatieResultModel>(path: string, body: any = {}): Observable<T> {
    return this.httpClient.put<T>(`${environment.api_url}/api/${path}`, body)
      .pipe(catchError(err => this.getFormatErrorsObservable(err)), map(r => r as T));
  }

  // TODO: nakijken of dit ook T extends ApiValidatieResultModel kan worden
  post<T>(path: string, body: any = {}): Observable<T> {
    return this.httpClient.post<T>(`${environment.api_url}/api/${path}`, body)
      .pipe(catchError(err => this.getFormatErrorsObservable(err)), map(r => r as T));
  }

  patch<T>(path: string, body: any = {}): Observable<T> {
    return this.httpClient.patch<T>(`${environment.api_url}/api/${path}`, body)
      .pipe(catchError(err => this.getFormatErrorsObservable(err)), map(r => r as T));
  }

  delete<T extends ApiValidatieResultModel>(path: string): Observable<T> {
    return this.httpClient.delete<T>(`${environment.api_url}/api/${path}`)
      .pipe(catchError(err => this.getFormatErrorsObservable(err)), map(r => r as T));
  }
  uploadFile<T extends ApiValidatieResultModel>(path: string, file: File): Observable<T> {
    const formData = new FormData();
    formData.append('files', file, file.name);

    return this.httpClient.post<T>(`${environment.api_url}/api/${path}`, formData)
      .pipe(catchError(err => this.getFormatErrorsObservable(err)), map(r => r as T));
  }
  uploadFileStream(path: string, file: File): Observable<HttpEvent<void>> {
    const formData = new FormData();
    formData.append('files', file, file.name);

    const options = {
      reportProgress: true
    };

    const req = new HttpRequest(
      'POST',
      `${environment.api_url}/api/${path}`,
      formData,
      { ...options, responseType: 'text' }
    );
    return this.httpClient.request(req);
  }
}
