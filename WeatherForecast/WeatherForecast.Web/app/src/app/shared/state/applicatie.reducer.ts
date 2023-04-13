import { ProgressMessageModel } from '../models/progress-message-model';
import { ApplicatieAction, ApplicatieActionTypes } from './applicatie.actions';

export const APPLICATIE_FEATURE_KEY = 'applicatieFeature';

export interface ApplicatieState {
  progressMessage: ProgressMessageModel;
}

export interface ApplicatiePartialState {
  readonly [APPLICATIE_FEATURE_KEY]: ApplicatieState;
}

const progressMessageModelInitialState: ProgressMessageModel = {
  context: '',
  message: '',
  messageType: null
};

export const applicatieInitialState: ApplicatieState = {
  progressMessage: {...progressMessageModelInitialState}
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
  return state;
}
