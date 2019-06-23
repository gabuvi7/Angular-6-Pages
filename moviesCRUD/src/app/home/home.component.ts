import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  API_ENDPOINT = 'http://localhost:8000/api'; //el point a donde quiero consultar. Hago una pausa y creo la API.
  constructor(private moviesService: MoviesService, private httpClient: HttpClient) {

   }

  ngOnInit() {
  }

}
