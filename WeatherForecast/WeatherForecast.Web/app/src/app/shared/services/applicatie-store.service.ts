import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProgressMessageModel } from '../models/progress-message-model';
import { UpdateProgressMessage } from '../state/applicatie.actions';
import { ApplicatieState } from '../state/applicatie.reducer';
import { applicatieQuery } from '../state/applicatie.selectors';

@Injectable({
  providedIn: 'root'
})
export class ApplicatieStoreService {
  progressMessage = this.store.pipe(select(applicatieQuery.getProgressMessage));

  constructor(private store: Store<ApplicatieState>) { }

  updateProgressMessage(model: ProgressMessageModel) {
    this.store.dispatch(new UpdateProgressMessage(model));
  }
}
