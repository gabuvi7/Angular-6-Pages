import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLocationServiceService {

  constructor() { }

  getGeoLocation(): Observable<any>{
    return new Observable( (observer) => {
      navigator.geolocation.getCurrentPosition(resp => {
        observer.next(resp);
      },
      error => {
        observer.error (error);
        console.log(error);
      })
    })
  }
}
