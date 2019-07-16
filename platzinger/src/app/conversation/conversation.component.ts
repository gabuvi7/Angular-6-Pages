import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { AuthenticationService } from '../services/authentication.service';

//Resolvemos la comunicacion en tiempo real.

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any; //declaro variable global.

  friend: User;
  user: User;
  conversation_id: string;
  textMessage: string;  
  conversation: any[];

  price: number = 78.2626262656654; // Creacion de variables para los pipes aplicados en el html.
  today: any = Date.now(); // para saber el dia de hoy.
  constructor(private activatedRoute: ActivatedRoute,
    /*agrego una nueva propiedad*/ private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService) { // Con el activatedRoute podemos acceder a los parametros que nos llegan. Ej. uid
    
      this.friendId = this.activatedRoute.snapshot.params['uid'];// el snapshot.params trae todos los parametros, entonces le tengo que indicar cual quiero traer, debo poner el mismo nombre que puse en el app.module.ts en la parte de conversation/:uid.
    console.log(this.friendId);

    
    
    this.authenticationService.getStatus().subscribe( (session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe( (user: User) => {
        this.user = user;
        
        //Pongo el getuserbyid aca para asegurarme que ya tengo los 2 usuarios.
        
        this.userService.getUserById(this.friendId).valueChanges().subscribe( (data: User) => {
          this.friend = data; 
          //creo un arreglo que va a tener los id de los 2 user:
          const ids = [this.user.uid, this.friend.uid].sort(); //el sort lo ordena para que siempre se encuentre igual, y no haya problemas al ingresar a la conversacion. Dado que mi amigo puede ingresar primero o al reves, y eso modificaria el id de la conversacion.
          this.conversation_id = ids.join('|'); //el join aplicado a un arreglo de js concatena todos los elementos en un string, separandolo por un parametro que le paso 
          this.getConversation(); //obtengo la conversacion para enviarla al textarea.

        }, (error) => {
          console.log("Ocurrio un error");
        });
        console.log(this.friend);

      });
    },
    (error) => {
      console.log("Ocurrio un error en el subscribe de getStatus", error);
    });

  } 

  ngOnInit() {
  }

  sendMessage(){
    const message = {
      uid: this.conversation_id , //el mismo id debe ser el mensaje enviado y recibido, para que no genere 2 conversaciones distintas.
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver: this.friend.uid
    };
    this.conversationService.createConversation(message).then( () => {
      this.textMessage = '';
    });
  }

  getConversation(){
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe( (data) => {
      this.conversation = data;
      this.conversation.forEach( (message) => {
        if(!message.seen) { //si el mensaje no fue visto 
          message.seen = true;
          this.conversationService.editConversation(message);
          //ahora vamos a repro el audio: con html5:
          const audio = new Audio ('assets/sound/new_message.m4a');
          audio.play();
        }
      });

      console.log(data);
    },
    (error) => {
      console.log(error);
    });
  }

  getUserNickById(id){
    if (id === this.friend.uid){
      return this.friend.nick;
    }
    else{
      return this.user.nick;
    }
  }

}
