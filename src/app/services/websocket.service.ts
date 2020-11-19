import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  public checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });
  }

  public emit(evento: string, payload?: any, callback?: Function) {
    console.log("WebsocketService -> emitiendo ->", evento)
    //emit('evento', payload , callback)
    this.socket.emit(evento, payload, callback);
  }

  public listen(evento: string) {
    return this.socket.fromEvent(evento);
  }


}
