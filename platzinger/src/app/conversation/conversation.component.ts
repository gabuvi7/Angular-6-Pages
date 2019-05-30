import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any; //declaro variable global.
  constructor(private activatedRoute: ActivatedRoute) { // Con el activatedRoute podemos acceder a los parametros que nos llegan. Ej. uid
    this.friendId = this.activatedRoute.snapshot.params['uid'];// el snapshot.params trae todos los parametros, entonces le tengo que indicar cual quiero traer, debo poner el mismo nombre que puse en el app.module.ts en la parte de conversation/:uid.
    console.log(this.friendId);
  } 

  ngOnInit() {
  }

}
