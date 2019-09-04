import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  user: User; 

  constructor(private userService: UserService, private authenticationService: AuthenticationService, 
    private fbStorage: AngularFireStorage) {
    //obtengo el id de la sesion
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe( (data: User) =>{
        this.user = data;
        console.log("userID", this.user);
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
  }

  saveSettings(){
    if(this.croppedImage){
      const currentPictureID = Date.now();
      const pictures = this.fbStorage.ref('pictures/'+ currentPictureID + '.jpg').putString(this.croppedImage, 'data_url');
      pictures.then( (result) =>{
        this.picture = this.fbStorage.ref('pictures/' + currentPictureID + '.jpg').getDownloadURL(); //llamo a fbstorage y getdownloadurl para que se me genere una url, en formato binario, de la imagen que se acaba de subir.
        this.picture.subscribe( (p) => {
          this.userService.setAvatar(p, this.user.uid).then( () => {
              alert('Imagen subida correctamente.');
          }).catch((error) => {
            alert('Hubo un error al tratar de subir la imagen');
            console.log('Error en el then: ', error);
          });
        },
        (error) => {
          console.log('Error en el subscribe: ',error);
        });
      }).catch((error) => {
        console.log(error);
      });

    }else{
      this.userService.editUser(this.user).then( () =>{
        alert('Cambios guardados');
      }).catch( (error) => {
        alert('Hubo un error');
        console.log('Error en guardar cambios: ',error);
      });
    }
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

}
