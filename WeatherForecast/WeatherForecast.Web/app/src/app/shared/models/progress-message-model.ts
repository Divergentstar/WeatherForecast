import { MessageTypeEnum } from './enums';

export class ProgressMessageModel {
  context!: string;
  message!: string;
  messageType!: MessageTypeEnum | null;

  constructor(init?: Partial<ProgressMessageModel>) {
    Object.assign(this, init);
  }
}
