import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private cookieService:CookieService) { }
  intercept(req, next){ //intercept method accepts two parameters req and nex
    let token= this.cookieService.get("token");
    let tRequest=req.clone({ //first we saill clone the request then add the headers and pass them to handle method 
      setHeaders:{    //adding headers information by cloning request
        Authorization:`Bearer ${token}`   //some convention bearer token
      }
    })
return next.handle(tRequest)
  }
}
