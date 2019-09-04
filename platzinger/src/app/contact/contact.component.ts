import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  // el input permite que desde un comp padre me mande info, en este caso es el id del user. Es decir, recivo info desde un componente externo.
  @Input() uid: string;
  contact: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.uid);
    this.userService.getUserById(this.uid).valueChanges().subscribe( (data:User) => {
      this.contact = data;
    } );
  }

}
