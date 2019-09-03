import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user'; // Importo la interface User para poder declarar la variable tipo User.
import { UserService } from '../services/user.service';
import { AuthenticationGuard } from '../services/authentication.guard';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

// Importamos para utilizar la api weather:
import { HttpClient } from '@angular/common/http';
import { map, timestamp } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  private appId: string;
  private appCode: string;

  public weather: any;

  friends: User []; // Declaramos el array de tipo user fuera del constructor para que sea visible para todos.
  query: string = ''; //Declaro la variable query para usar en el ngModel del home.component.html 
 
  closeResult: string;
  friendEmail: string = '';

  greetingRequest: string;

    // Inyectamos un servicio en el constructor.
    constructor(private http: HttpClient, private userServices: UserService, private authenticationService: AuthenticationService, private router: Router,
      private modalService: NgbModal, private requestService: RequestsService){
      userServices.getUsers().valueChanges().subscribe( (data: User [] ) => {
        this.friends = data;
        
      }, (error) => {
        console.log("Ocurrio un error");
      }); // con el metodo obtengo los usuarios.
      
      this.appId = "AOcsvkLW66Gn0JdMaEIm";
      this.appCode = "jFSgzGC7rrtFmDCZ1ceq4Q";
      this.weather = [];
      
       //obtengo el id de la sesion
      this.authenticationService.getStatus().subscribe((status) => {
        this.userServices.getUserById(status.uid).valueChanges().subscribe( (data: User) =>{
          this.user = data;
          //console.log("userID", this.user);
          if (this.user.friends){
            this.user.friends = Object.values(this.user.friends);
            console.log(this.user);
          }
        },
        (error) =>{
          console.log(error);
        });
      },
      (error) =>{
        console.log(error);
      });


   }
  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.getWeather(position.coords);
      //  this.getLocation(position.coords);
      } );
    }else{
      console.error("El explorador no soporta geolocalizacion.");
    }
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

  saveStatinger(){
    this.userServices.editUser(this.user).then( () =>{
      alert('Statinger guardado');
    }).catch( (error) => {
      alert('Hubo un error');
      console.log('Error en guardar statinger: ',error);
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }

  sendRequest(){
    const request = { 
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending',
      greeting: this.greetingRequest,
      sender_email: this.user.email
    };
    this.requestService.createRequest(request).then( () => {
      alert('Solicitud enviada');
    }).catch( (error) => {
      alert('Hubo un error al enviar la solicitud.');
      console.log(error);
    });
  }

}
