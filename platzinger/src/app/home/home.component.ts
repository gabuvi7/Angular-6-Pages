import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'; // Importo la interface User para poder declarar la variable tipo User.
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User []; // Declaramos el array de tipo user fuera del constructor para que sea visible para todos.
  query: string = ''; //Declaro la variable query para usar en el ngModel del home.component.html 
 
    // Inyectamos un servicio en el constructor.
    constructor(private userServices: UserService){
      userServices.getUsers().valueChanges().subscribe( (data: User [] ) => {
        this.friends = data;
        
      }, (error) => {
        console.log("Ocurrio un error");
      }); // con el metodo obtengo los usuarios.
      
   }
  ngOnInit() {
  }

}
