import { Component } from '@angular/core';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private Authenticated:UserService){

  }
  Logged :boolean = this.Authenticated.Authenticated();
  islogout(){
    this.Authenticated.Login(!this.Logged);
    this.Logged = this.Authenticated.Authenticated();
  }
}
