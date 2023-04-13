import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicatieState, APPLICATIE_FEATURE_KEY } from './applicatie.reducer';

const getApplicatieState = createFeatureSelector<ApplicatieState>(APPLICATIE_FEATURE_KEY);

const getProgressMessage = createSelector(
  getApplicatieState,
  (state: ApplicatieState) => state.progressMessage
);

export const applicatieQuery = {
  getProgressMessage
};
