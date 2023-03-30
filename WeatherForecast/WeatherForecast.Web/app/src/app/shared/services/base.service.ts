import { Injectable } from '@angular/core';
import { ApiValidatieResultModel } from '../models/api-validatie-result-model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  handleApiResponseShowValidatiefoutInToast<T extends ApiValidatieResultModel>(result: T, boodschapSuccess: string, boodschapValidatieFouten: string, boodschapError: string) {
    if (result.success) {
      this.handleSuccess(boodschapSuccess);
    } else {
      this.handleErrorShowValidatiefoutInToast(result, boodschapError, boodschapValidatieFouten);
    }
  }
  handleApiResponse<T extends ApiValidatieResultModel>(result: T, boodschapSuccess: string, boodschapValidatieFouten: string, boodschapError: string) {
    if (result.success) {
      this.handleSuccess(boodschapSuccess);
    } else {
      this.handleError(result, boodschapError, boodschapValidatieFouten);
    }
  }
  handleError<T extends ApiValidatieResultModel>(result: T, boodschapError: string, boodschapValidatieFouten: string): void {
    if (result.validatieFouten && result.validatieFouten.length > 0) {
      console.log(boodschapValidatieFouten);
    } else {
      console.log(boodschapError);
    }
  }
  handleErrorShowValidatiefoutInToast<T extends ApiValidatieResultModel>(result: T, boodschapError: string, boodschapValidatieFouten: string): void {
    if (result.validatieFouten && result.validatieFouten.length > 0) {
      console.log(`${boodschapValidatieFouten} ${result.validatieFouten[0]}`);
    } else {
      console.log(boodschapError);
    }
  }
  handleSuccess(boodschapSuccess: string): void {
    console.log(boodschapSuccess);
  }
}
