import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'; // Importo la interface User para poder declarar la variable tipo User.
import { UserService } from '../services/user.service';
import { AuthenticationGuard } from '../services/authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

// Importamos para utilizar la api weather:
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private appId: string;
  private appCode: string;

  public weather: any;

  friends: User []; // Declaramos el array de tipo user fuera del constructor para que sea visible para todos.
  query: string = ''; //Declaro la variable query para usar en el ngModel del home.component.html 
 
    // Inyectamos un servicio en el constructor.
    constructor(private http: HttpClient, private userServices: UserService, private authenticationService: AuthenticationService, private router: Router){
      userServices.getUsers().valueChanges().subscribe( (data: User [] ) => {
        this.friends = data;
        
      }, (error) => {
        console.log("Ocurrio un error");
      }); // con el metodo obtengo los usuarios.
      
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
        }, error => {
            console.error(error);
        });
  }

 /* public getLocation(coordinates: any){
    return this.http.jsonp("https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=" + coordinates.latitude + "&longitude=" + coordinates.longitude + "&oneobservation=true&app_id=" + this.appId + "&app_code=" + this.appCode, "jsonpCallback")
    .pipe(map(result => (<any>result).observationtype.location))
    .subscribe(result => {
      this.locat = result.observation;
      console.log(this.locat);
    }, error => {
      console.error(error);
    });
  }*/
}
