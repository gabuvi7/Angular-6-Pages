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

import { FormsModule } from '@angular/forms'

// Declaracion de rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // Lo dejo vacio porque si la ruta no matchea con el path, lo lleva al HomeComponent
  {path: 'home', component: HomeComponent}, // Ruta para home
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:uid', component: ConversationComponent}, // modifico para poder enviar un parametro.
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe //incluimos el pipe creado
  ],
  imports: [ // El imports extiende funcionalidades de la app.
    BrowserModule,
    // Importar el RouterModule. No viene por defecto.
    RouterModule.forRoot(appRoutes), // Le agreda caracteristicas de navegacion. Recibe las rutas y escucha si existe alguna modificacion en las rutas.
    FormsModule // importar el formsmodule porque sino, no funciona.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
