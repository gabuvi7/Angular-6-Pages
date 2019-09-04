import { Component, OnInit } from '@angular/core';

// Importamos para utilizar la api weather:
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'; // Este lo importo para usarlo en el html y mostrar la ubicaciom, solo si se encuentra en /home
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  private appId: string;
  private appCode: string;

  public weather: any;
  public city: any;
  public state: any;
  public country: any;

  constructor(private http: HttpClient, public router: Router, private authenticationService: AuthenticationService) {
     
    this.appId = "AOcsvkLW66Gn0JdMaEIm";
    this.appCode = "jFSgzGC7rrtFmDCZ1ceq4Q";
    this.weather = [];
    

   }

   ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeather(position.coords);
      //  this.getLocation(position.coords);
      } );
    }else{
      console.error("El explorador no soporta geolocalizacion.")
    }
  }
  logOut(){
    this.authenticationService.logOut().then( () => {
      alert('Sesión cerrada con éxito.');
      this.router.navigate(['login']);
    }).catch( (error) => {
      console.log(error);
    });
  }
  public getWeather(coordinates: any) {
    return this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=forecast_7days_simple&language=spanish&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
        .pipe(map(result => (<any>result).dailyForecasts.forecastLocation))
        .subscribe(result => {
            this.weather = result.forecast;
            this.city = result.city;
            this.state = result.state;
            this.country = result.country;

          console.log(result.dayOfWeek);
            console.log(result.state);
            console.log(result.city);
        }, error => {
            console.error(error);
        });
  }

}
