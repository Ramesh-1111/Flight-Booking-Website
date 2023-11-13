import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  mobileNumber!: string;
  otp!: string;
  otpSent!: boolean;
  isVerified!: boolean;
  maskedMobileNumber!: string;
  public isLoggedIn! :boolean;

  constructor(private http: HttpClient, private router: Router,private login:UserService) {}

  sendOTP() {
    this.http
      .post('http://localhost:3000/api/sendOTP', { mobileNumber: this.mobileNumber })
      .subscribe(
        (response: any) => {
          console.log(response.message);
          this.otpSent = true;
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  verifyOTP() {
    this.http
      .post('http://localhost:3000/api/verifyOTP', { mobileNumber: this.mobileNumber, otp: this.otp })
      .subscribe(
        (response: any) => {
          console.log(response.message);
          this.isVerified = true;
          this.maskedMobileNumber = this.mobileNumber.replace(/.(?=.{4})/g, '*');
          this.router.navigate(['/']);
          this.login.Login(this.isVerified);

        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
