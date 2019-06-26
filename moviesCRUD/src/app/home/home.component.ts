import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  API_ENDPOINT = 'http://127.0.0.1:8000/api'; //el point a donde quiero consultar. Hago una pausa y creo la API. ... API Creada, esa es la ip.
  movies: Movie[];
  constructor(private moviesService: MoviesService, private httpClient: HttpClient) {
    httpClient.get(this.API_ENDPOINT + '/movies').subscribe((data: Movie[]) => {
      this.movies = data;
    } );
   }

  ngOnInit() {
  }

}
