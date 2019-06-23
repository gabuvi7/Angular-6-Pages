import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //decorador que permite inyectar el servicio en cualquier componente.
})
export class MoviesService {

  constructor() { }
}
