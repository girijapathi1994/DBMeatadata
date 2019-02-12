
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData={
    email:"",
    password:""
  };
  confirmPassword;
  constructor(private authService:AuthService,private cookieService:CookieService,
    private router:Router) { }

  ngOnInit() {
  }
  registerUser(){
    
    this.authService.registerUser(this.registerUserData).subscribe(
     res=>{
        this.cookieService.set("token",res['token'])
        this.router.navigate(['/info'])
     },
     err=>console.log(err)
   )
  }

}
