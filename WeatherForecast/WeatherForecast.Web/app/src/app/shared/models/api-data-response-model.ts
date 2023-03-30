import { ApiValidatieResultModel } from './api-validatie-result-model';

export class ApiDataResponseModel<TResult> extends ApiValidatieResultModel {
  result!: TResult;

  constructor(init?: Partial<ApiDataResponseModel<TResult>>) {
    super(init);
  }
}
