import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root' //decorador que permite inyectar el servicio en cualquier componente.
})
export class MoviesService {
  API_ENDPOINT = 'http://127.0.0.1:8000/api';
  constructor(private httpClient: HttpClient) {

   }
   get(){
    return this.httpClient.get(this.API_ENDPOINT + '/movies');
   }

   save(movie: Movie){
     const headers = new HttpHeaders({'Content-Type':'application/json'}); //especial para los metodos de POST, cualquiera que no sea GET.
     return this.httpClient.post(this.API_ENDPOINT + '/movies', movie, {headers: headers});
   }

   put(movie){ //Con este metodo puedo editar la pelicula.
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.httpClient.put(this.API_ENDPOINT + '/movies/' + movie.id, movie, {headers: headers}); 
   }

   delete(id){
    return this.httpClient.delete(this.API_ENDPOINT + '/movies/' + id);
   }
}
