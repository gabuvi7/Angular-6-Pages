import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  // Ya no lo uso aca. API_ENDPOINT = 'http://127.0.0.1:8000/api'; //el point a donde quiero consultar. Hago una pausa y creo la API. ... API Creada, esa es la ip.
  
  movies: Movie[];
  constructor(private moviesService: MoviesService) {
    this.getMovies();
   }

  ngOnInit() {
  }

  getMovies(){
    this.moviesService.get().subscribe( (data: Movie[]) => {
      this.movies = data;
    }, (error) => {
      console.log(error);
      alert('Ocurrio un error.');
    });
  }

  delete(id){
    if(confirm('Seguro que desea eliminar esta pelicula?')){
      this.moviesService.delete(id).subscribe((data) => {
        alert('Pelicula eliminada');
        console.log(data);
        this.getMovies();
      }, (error) => {
        console.log(error);
        console.log('Ocurrio un error.');
      });
    }
  }
}
