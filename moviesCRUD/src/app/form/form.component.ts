import { Component, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MoviesService } from '../services/movies.service';

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
  constructor(private moviesService: MoviesService) {
    
   }

  ngOnInit() {
  }

  saveMovie(){
    this.moviesService.save(this.movie).subscribe((data) => {
      alert('Pelicula guardada');
      console.log(data);
    }, (error) => {
      console.log(error);
      console.log('Ocurrio un error.');
    });
  }
}
