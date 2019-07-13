import { Injectable } from '@angular/core';


// Importamos para utilizar la api weather:
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Weather } from '../weather.model';

@Injectable({
  providedIn: 'root'
})
export class GetweatherAndLocationService {

  private appId: string;
  private appCode: string;
  private apiEndPoint: string;
  public weather: any;
  public city: any;
  public state: any;

  constructor(private http: HttpClient) {
    this.appId = "AOcsvkLW66Gn0JdMaEIm";
    this.appCode = "jFSgzGC7rrtFmDCZ1ceq4Q";
    this.apiEndPoint = "https://weather.cit.api.here.com/weather/1.0/report.json"
    this.weather = [];



    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeather(position.coords);
      //  this.getLocation(position.coords);
      } );
    }else{
      console.error("El explorador no soporta geolocalizacion.")
    }

   }

   public getWeather(coordinates: any) {
    return this.http.jsonp(this.apiEndPoint + "?product=forecast_7days_simple&language=spanish&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
        .pipe(map( (result: any) =>{
            let city = result.city;
            let state = result.state;
            let country = result.country;
            let weather = result.forecast;
            let icon = result.icon;
            let x: Weather = { city, state, country, weather, icon};
            console.log(x);
            return x; 
            
        }, error => {
            console.error(error);
        })
      );
  }

}
