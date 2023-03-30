export class ApiValidatieResultModel {
  errors: string[];
  success!: boolean;
  validatieFouten: string[];

  constructor(init?: Partial<ApiValidatieResultModel>) {
    Object.assign(this, init);
    this.errors = [];
    this.validatieFouten = [];
  }
}
