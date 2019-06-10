import { Injectable } from '@angular/core';

//Importar angularfireauth para usar la autenticacion de firebase

import { AngularFireAuth } from '@angular/fire/auth'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {

   }
   loginWithEmail (email: string, password: string){
     return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
   }
   registerWithEmail (email: string, password: string){
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus(){
    return this.angularFireAuth.authState; //recibe info cada vez que haya un cambio en la sesion del user.
  }
  logOut(){
    return this.angularFireAuth.auth.signOut();
  }
}
