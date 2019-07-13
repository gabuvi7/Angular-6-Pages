import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';

// Importar el appRoutes.
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component'; 

import { SearchPipe } from './pipes/search';

import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthenticationGuard } from './services/authentication.guard';

//Importo HttpClient para poder consumir la api de weather. 
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MomentPipe } from './pipes/moment.pipe';



// Declaracion de rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // Lo dejo vacio porque si la ruta no matchea con el path, lo lleva al HomeComponent
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]}, // Ruta para home
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:uid', component: ConversationComponent}, // modifico para poder enviar un parametro.
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]}
];

/*Type '{ ngModule: typeof AngularFireModule; providers: { provide: InjectionToken<string | FirebaseAppConfig>; useValue: string | FirebaseAppConfig; }[]; }' is not assignable to type 'any[] | Type<any> | ModuleWithProviders<{}>'.
  Property 'FormsModule' is missing in type '{ ngModule: typeof AngularFireModule; providers: { provide: InjectionToken<string | FirebaseAppConfig>; useValue: string | FirebaseAppConfig; }[]; }' but required in type 'ModuleWithProviders<{}>'.
*/
@NgModule({
  imports: [ // El imports extiende funcionalidades de la app.
    BrowserModule,
    // Importar el RouterModule. No viene por defecto.
    RouterModule.forRoot(appRoutes), // Le agreda caracteristicas de navegacion. Recibe las rutas y escucha si existe alguna modificacion en las rutas.
    FormsModule, // importar el formsmodule porque sino, no funciona.
    AngularFireModule,//.initializeApp(environment.firebaseConfig), NO ME FUNCIONA CON INITIALIZEAPP.
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    HttpClientModule, 
    HttpClientJsonpModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    MomentPipe //incluimos el pipe creado
  ],
  providers: [
    { provide: FirebaseOptionsToken, useValue: environment.firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



/* Vamos a utilizar Firebase para hacer la parte del Backend.*/

/* 37 - Vamos a utilizar firebase con una conexion a traves de Sockets. */