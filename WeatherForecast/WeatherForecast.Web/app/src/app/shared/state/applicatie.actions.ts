import { Action } from '@ngrx/store';
import { ProgressMessageModel } from '../models/progress-message-model';

// Action types must be unique throughout the entire application --> [featureName]
export enum ApplicatieActionTypes {
  UpdateProgressMessage = '[Applicatie] Update Progress Message'
}

export class UpdateProgressMessage implements Action {
  readonly type = ApplicatieActionTypes.UpdateProgressMessage;
  constructor(public payload: ProgressMessageModel) {}
}

export type ApplicatieAction = UpdateProgressMessage;

export const ApplicatieActions = {
  UpdateProgressMessage
};
