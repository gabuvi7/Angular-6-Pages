import { Injectable } from '@angular/core';
// Importamos la interfaz User
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';
// nos traemos info de home.components.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDataBase: AngularFireDatabase) { 
    //aca cortamos y pegamos desde el home.component.ts toda la info.

   //Elimino los datos de usuarios y metodos porque ahora puedo agregar la conexion a Firebase, y trabajar datos remotos.

  }
  getUsers(){
    return this.angularFireDataBase.list('/users'); //Regresa todos los usuarios.
  }

  getUserById(uid){
    return this.angularFireDataBase.object('/users/' + uid); //Solamente regresa el id de un usuario.
  }

  createUser(user){
    return this.angularFireDataBase.object('/users/' + user.uid).set(user); //Al id le insertamos el user completo.
  }

  editUser(user){
    return this.angularFireDataBase.object('/users/' + user.uid).set(user); //Al id le insertamos el user completo.
  }

  
  
}
