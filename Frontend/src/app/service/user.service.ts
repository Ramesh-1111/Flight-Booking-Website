import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  islogged :boolean =false;
  Login(verify:boolean){
    this.islogged = verify; 
  }
  Authenticated(){
    return this.islogged;
  }
  
}
