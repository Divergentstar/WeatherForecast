import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicatieState } from './applicatie.reducer';

@Injectable()
export class ApplicatieEffects {
  constructor(
    private actions: Actions,
    private store: Store<ApplicatieState>
  ) { }
}
