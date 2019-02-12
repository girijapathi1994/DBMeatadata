import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url="https://databasemean.herokuapp.com/api/";
  constructor(private httpClient:HttpClient,private cookieService:CookieService) { }
  getAllCollections(){
    return this.httpClient.get(this.url+"getAllcollections");
  }
  registerUser(user){
    return this.httpClient.post(this.url+"register",user)
  }
  loginUser(user){
    return this.httpClient.post(this.url+"login",user)
  }
  loggedIn(){
    return !!this.cookieService.get("token");
  }
}
