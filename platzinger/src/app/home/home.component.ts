import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'; // Importo la interface User para poder declarar la variable tipo User.

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  friends: User []; // Declaramos el array de tipo user fuera del constructor para que sea visible para todos.

  /*
  // Empezamos con typescript:

  constructor() {
    let c: number = 1; // lo utilizamos para declarar una variable de tipo let. Con let tenemos menos alcance que con Var.
    let b: number = 2;

    let e: string = '1';
    let f:string = '2';
    console.log(c + b); // Nos imprime un 12 dado que c es un int y b es una cadena, entonces JS concatena las variables. 
    // Para evitar eso, le seteamos un tipo de dato a la variable. Ej: let c: number = 1
    console.log (e + f);

    let g:boolean = true;
    let h:object = {}; // Creo un objeto vacio.;

    console.log(g);
    console.log(h);

    let i = [c, b, e, f, g, h]; //Un arreglo puede contener distintas variables con distintos tipos de datos.

    console.log(i);

    let j: boolean [] = [false, g];
    console.log(j);

    let k:object [] = [{}, h] // Objeto array.

    let l: any [] = [1, 'ae', true]; //arreglo de cualquier cosa, num, string, etc.
   }

   */

   constructor() {
    let myUser: User = {
      nick: "Gabriel",
      subnick: 'Hola!',
      age:23,
      email:  'asdsa@dwsd.com',
      friend: true,
      uid: 1
    };

    console.log(myUser);

    let users: User [] = [
      myUser
      //2, No puedo pasarle un numero dado que debe ser del tipo User.
    ];

    // Creacion de usuarios.
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

    this.friends = [usuario1, usuario2, usuario3, usuario4, usuario5]; // Con this me refiero a la clase completa y referencio la variable friends.

    // Este arreglo lo puedo recorrer desde el home.component.html

   }
  ngOnInit() {
  }

}
