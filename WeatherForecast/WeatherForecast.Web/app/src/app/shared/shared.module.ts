import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicatieEffects } from './state/applicatie.effects';
import { applicatieInitialState, applicatieReducer, APPLICATIE_FEATURE_KEY } from './state/applicatie.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      APPLICATIE_FEATURE_KEY,
      applicatieReducer,
      { initialState: { ...applicatieInitialState } }
    ),
    EffectsModule.forFeature([ApplicatieEffects])
  ],
  providers: [],
  exports: []
})
export class SharedModule { }
