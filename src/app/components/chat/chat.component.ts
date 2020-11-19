import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto: string;
  private mensajesSubscription: Subscription;
  public mensajes = [];
  constructor(private chatService: ChatService) {

   }
  public elemento: HTMLElement;

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    this.getMessages();
  }

  ngOnDestroy() {
    this.mensajesSubscription.unsubscribe();
  }

  public enviar(): void {
    if (this.texto === null || this.texto.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.texto);
    this.texto = null;

  }

  private getMessages() {
    this.mensajesSubscription = this.chatService.getMessage().subscribe(mensaje => {
      console.log("ChatComponent -> getMessages -> mensaje", mensaje)
      this.mensajes.push(mensaje);
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

}
