import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

//Resolvemos la comunicacion en tiempo real.

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any; //declaro variable global.

  friend: User;

  price: number = 78.2626262656654; // Creacion de variables para los pipes aplicados en el html.
  today: any = Date.now(); // para saber el dia de hoy.
  constructor(private activatedRoute: ActivatedRoute,
    /*agrego una nueva propiedad*/ private userService: UserService) { // Con el activatedRoute podemos acceder a los parametros que nos llegan. Ej. uid
    this.friendId = this.activatedRoute.snapshot.params['uid'];// el snapshot.params trae todos los parametros, entonces le tengo que indicar cual quiero traer, debo poner el mismo nombre que puse en el app.module.ts en la parte de conversation/:uid.
    console.log(this.friendId);

    this.userService.getUserById(this.friendId).valueChanges().subscribe( (data: User) => {
      this.friend = data; 
    }, (error) => {
      console.log("Ocurrio un error");
    })
    console.log(this.friend);
  } 

  ngOnInit() {
  }

}
