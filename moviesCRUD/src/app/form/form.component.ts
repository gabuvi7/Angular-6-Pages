import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
movie: Movie ={
  name: null,
  year: null,
  description: null,
  duration: null,
  genre: null
};
id: any;
editing: boolean = false; 
movies: Movie[]; //no se recomienda hacer esto.
  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id']; /* Esto sirve para capturar el id de la pelicula. Esto funciona porque en el app.module.ts puse una nueva ruta llamada form:id. Ese id es el que quiero capturar aca.
    Si quiero capturar otros parametros, configuro la ruta en el app.module.ts y luego desde aca, uso snapshot y activatedRoute para capturar el parametro.*/
    console.log(this.id);
    if(this.id){
      this.editing = true;
      this.moviesService.get().subscribe((data: Movie[]) => {
        this.movies = data;
        this.movie = this.movies.find((m) => { //Lo que hago con estas lineas es que me rellene los campos de edicion con la pelicula correspondiente.
          return m.id == this.id
        });
        console.log(this.movie);
      }, (error) => {
        console.log(error);
        alert('Ocurrio un error');
      });
    } else{
      this.editing = false;
    }
  }

  ngOnInit() {
  }

  saveMovie(){
    //Pregunto si estamos editando:
    if(this.editing)
    {
      this.moviesService.put(this.movie).subscribe((data) => {
        alert('Pelicula actualizada');
        console.log(data);
      }, (error) => {
        console.log(error);
        console.log('Ocurrio un error.');
      });
    }else{ //Si no estamos editando, estamos creando:
      this.moviesService.save(this.movie).subscribe((data) => {
        alert('Pelicula guardada');
        console.log(data);        
      }, (error) => {
        console.log(error);
        console.log('Ocurrio un error.');
      });
    }
    return this.moviesService.get();
    
  }
}
