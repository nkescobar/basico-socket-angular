import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public websocketService: WebsocketService) {

  }

    public sendMessage(mensaje: string) {
      const payload = {
        de: 'Nasly',
        cuerpo: mensaje
      };
      this.websocketService.emit('mensaje', payload);
    }

    public getMessage() {
     return this.websocketService.listen('mensaje-nuevo');
    }
  }
