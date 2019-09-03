import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDatabase: AngularFireDatabase) {

   }

   createRequest (request){
     // Convierto los puntos del mail por comas, dado que firebase no acepta puntos.
     const cleanEmail = request.receiver_email.replace('.',',');
     return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender).set(request);
   }

   //metodo para status de request:
   setRequestStatus(request, status){
     const cleanEmail = request.receiver_email.replace('.',',');
     return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender + '/status').set(status);
   }

   //consultar request pendientes:
   getRequestForEmail(email){
    const cleanEmail = email.replace('.',',');
    return this.angularFireDatabase.list('requests/' + cleanEmail );

   }
}
