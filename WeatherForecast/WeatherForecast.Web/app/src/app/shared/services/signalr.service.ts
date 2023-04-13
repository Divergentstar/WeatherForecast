import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { ApplicatieStoreService } from './applicatie-store.service';
import { ProgressMessageModel } from '../models/progress-message-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection?: HubConnection;

  constructor(
    private applicatieStore: ApplicatieStoreService
  ) { }

  public buildConnection(path: string): void {
    console.log('building connection');
    this.hubConnection = new HubConnectionBuilder()
      //.configureLogging()
      .withUrl(`${environment.api_url}/${path}`, HttpTransportType.ServerSentEvents)
      .withAutomaticReconnect()
      .build();
  }

  public startConnection(): void {
    console.log('starting connection');

    if (this.hubConnection?.state === HubConnectionState.Connected) {
      return;
    }

    this.hubConnection?.start().then(
      () => {
        console.log('Hub connection started.');
      },
      error => console.error(error)
    );
  }


  public registerProgressListener(): void {
    const methodName = 'SendProgressMessage';
    console.log(`registering listener on method ${methodName}`);
    this.hubConnection?.on(methodName, (data: ProgressMessageModel) => {
      this.applicatieStore.updateProgressMessage(data);
    });
  }

  public registerListener<T>(methodName: string, data$: Subject<T>): void {
    console.log(`registering listener on method ${methodName}`);
    this.hubConnection?.on(methodName, (data: T) => {
      data$.next(data);
    });
  }

  public stopConnection(): void {
    console.log('stopping connection');

    if (this.hubConnection?.state === HubConnectionState.Disconnected) {
      return;
    }

    this.hubConnection?.stop().then(
      () => {
        console.log('Hub connection stopped.');
      },
      error => console.error(error)
    );
  }
}
