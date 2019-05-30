import { Injectable } from '@angular/core';
// Importamos la interfaz User
import { User } from '../interfaces/user';
// nos traemos info de home.components.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends: User[];
  constructor() { 
    //aca cortamos y pegamos desde el home.component.ts toda la info.

    let usuario1: User = {
      nick: 'Eduardo',
      age: 24,
      email: 'ed@aoe.aoe',
      friend: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      friend: true,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      friend: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      friend: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Marcos',
      age: 30,
      email:'marcos@aoe.aoe',
      friend: false,
      uid: 5
    };

    this.friends = [usuario1, usuario2, usuario3, usuario4, usuario5]; 


  }

  //Creamos un metodo para regresar friend.

  getFriends (){
    return this.friends;
  }
}
