import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { MessageTypeEnum } from '../models/enums';
import { environment } from '../../../environments/environment';
import { ApplicatieStoreService } from './applicatie-store.service';
import { ProgressMessageModel } from '../models/progress-message-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: HubConnection;

  constructor(private applicatieStore: ApplicatieStoreService) {}

  public initialiseConnection(path: string): void {
    this.buildConnection(path);
    this.startConnection();
  }

  public registerProgressListener(): void {
    const methodName = 'SendProgressMessage';
    console.log(`registering listener on method ${methodName}`);
    this.hubConnection?.on(methodName, (progressMessage: ProgressMessageModel) => {
      this.applicatieStore.updateProgressMessage(progressMessage);

      if (progressMessage.messageType !== MessageTypeEnum.Progress) {
        this.stopConnection();
      }
    });
  }

  public registerDataListener<T>(methodName: string, data$: Subject<T>): void {
    console.log(`registering listener on method ${methodName}`);
    this.hubConnection.on(methodName, (data: T) => {
      data$.next(data);
      this.stopConnection();
    });
  }

  private buildConnection(path: string): void {
    console.log('building connection');
    this.hubConnection = new HubConnectionBuilder()
      //.configureLogging()
      .withUrl(`${environment.api_url}/${path}`, HttpTransportType.ServerSentEvents)
      .withAutomaticReconnect()
      .build();
  }

  private startConnection(): void {
    console.log('starting connection');

    if (this.hubConnection.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection.start().then(
      () => {
        console.log('Hub connection started.');
      },
      error => console.error(error)
    );
  }

  private stopConnection(): void {
    console.log('stopping connection');

    if (this.hubConnection.state === HubConnectionState.Disconnected) {
      return;
    }

    this.hubConnection.stop().then(
      () => {
        console.log('Hub connection stopped.');
      },
      error => console.error(error)
    );
  }
}
