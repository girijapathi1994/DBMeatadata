import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData={
    email:"",
    password:""
  };
  constructor(private authService:AuthService,private cookieService:CookieService,
    private router:Router,private toastrService:ToastrService) { }

  ngOnInit() {
  }
  loginUser(){
  this.authService.loginUser(this.loginUserData).subscribe(
    res=>{
      this.cookieService.set("token",res['token'])
      this.toastrService.success('Hello world!', 'Toastr fun!');
      this.router.navigate(['/info'])
    },
    err=>console.log(err)
  )
  }

}
