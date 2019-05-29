import { Component, OnInit } from '@angular/core';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  ngOnInit() {
  }

}
