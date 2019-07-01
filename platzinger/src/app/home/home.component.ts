import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'; // Importo la interface User para poder declarar la variable tipo User.
import { UserService } from '../services/user.service';
import { AuthenticationGuard } from '../services/authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User []; // Declaramos el array de tipo user fuera del constructor para que sea visible para todos.
  query: string = ''; //Declaro la variable query para usar en el ngModel del home.component.html 
 
    // Inyectamos un servicio en el constructor.
    constructor(private userServices: UserService, private authenticationService: AuthenticationService, private router: Router){
      userServices.getUsers().valueChanges().subscribe( (data: User [] ) => {
        this.friends = data;
        
      }, (error) => {
        console.log("Ocurrio un error");
      }); // con el metodo obtengo los usuarios.
      
   }
  ngOnInit() {
  }

  logOut(){
    this.authenticationService.logOut().then( () => {
      alert('Sesión cerrada con éxito.');
      this.router.navigate(['login']);
    }).catch( (error) => {
      console.log(error);
    });
  }
}
