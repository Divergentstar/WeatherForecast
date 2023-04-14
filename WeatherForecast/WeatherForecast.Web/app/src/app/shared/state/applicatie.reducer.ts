import { ProgressMessageModel } from '../models/progress-message-model';
import { ApplicatieAction, ApplicatieActionTypes } from './applicatie.actions';

export const APPLICATIE_FEATURE_KEY = 'applicatieFeature';

export interface ApplicatieState {
  progressMessage: ProgressMessageModel | null;
}

export interface ApplicatiePartialState {
  readonly [APPLICATIE_FEATURE_KEY]: ApplicatieState;
}

export const applicatieInitialState: ApplicatieState = {
  progressMessage: null
};

export function applicatieReducer(
  state: ApplicatieState | undefined,
  action: ApplicatieAction
): ApplicatieState {
  switch (action.type) {
    case ApplicatieActionTypes.UpdateProgressMessage: {
      state = {
        ...state,
        progressMessage: action.payload
      };
      break;
    }
  }
  return state as ApplicatieState;
}
