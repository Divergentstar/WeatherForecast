import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection?: HubConnection;

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

  public registerListener<T>(methodName: string): Observable<T> {
    console.log(`registering listener on method ${methodName}`);
    const data$ = new Subject<T>();
    this.hubConnection?.on(methodName, (data: T) => {
      data$.next(data);
    });

    return data$;
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
