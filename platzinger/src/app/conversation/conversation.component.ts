import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  friendId: any; //declaro variable global.

  friends: User[];
  friend: User;
  constructor(private activatedRoute: ActivatedRoute,
    /*agrego una nueva propiedad*/ private userService: UserService) { // Con el activatedRoute podemos acceder a los parametros que nos llegan. Ej. uid
    this.friendId = this.activatedRoute.snapshot.params['uid'];// el snapshot.params trae todos los parametros, entonces le tengo que indicar cual quiero traer, debo poner el mismo nombre que puse en el app.module.ts en la parte de conversation/:uid.
    console.log(this.friendId);

    this.friends = this.userService.getFriends();
    this.friend = this.friends.find((record) => {
      return record.uid == this.friendId;
      
    });
    console.log(this.friend);
  } 

  ngOnInit() {
  }

}
