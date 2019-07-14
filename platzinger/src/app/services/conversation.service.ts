import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private angularFireDB: AngularFireDatabase) {

   }

   createConversation(conversation){
    return this.angularFireDB.object('conversations/'+ conversation.uid + '/' + conversation.timestamp).set(conversation); // De esta forma se crean las conversaciones.
   }

   getConversation(uid){
     return this.angularFireDB.list('conversations/' + uid); // Regresamos todos los mensajes de la conversacion.
   }
}
