import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Weather } from '../weather.model';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  private appId: string;
  private appCode: string;
  private apiEndPoint: string;
  
  constructor(private http: HttpClient) {
    /*this.appId = "AOcsvkLW66Gn0JdMaEIm";
    this.appCode = "jFSgzGC7rrtFmDCZ1ceq4Q";
    this.apiEndPoint = "https://weather.cit.api.here.com/weather/1.0/report.json"*/

    this.appId = "a25b1842fadabbfcd804aadc3e545e0a";
    this.apiEndPoint = "https://api.openweathermap.org/data/2.5/";
   }

   getWeather(lat:string, lon:string){
      return this.http.get(this.apiEndPoint+"weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + this.appId)
      .pipe(map ( (result: any) => {
          let city = result.city;
          let state = result.sys.state;
          let country = result.sys.country;
          let weather = result.weather[0].main;
          let icon = result.weather[0].icon;
          let temp = parseInt(result.main.temp);
          let x: Weather = { city, state, country, weather, icon, temp};
          console.log("GetWeather",x);
          return x; 
          
        }, error => {
          console.error(error);
        }
      ));
  }
}
