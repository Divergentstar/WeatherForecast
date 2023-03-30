export class ListResultModel<T> {
  /**
   * The data that will be rendered by the Grid as an array.
   */
  data: T[];
  /**
   * The total number of records that are available.
   */
  total: number;
  /**
   * The total number of records before filtering.
   */
  unfilteredTotal: number;
  /**
  * Werd de data al geladen via een service call of niet?
  */
  initialModel: boolean;

  constructor(init?: Partial<ListResultModel<T>>) {
    Object.assign(this, init);
    this.data = [];
    this.total = 0;
    this.unfilteredTotal = 0;
    this.initialModel = false;
  }
}
