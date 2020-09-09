import { Injectable } from '@angular/core';
import{HttpClient} from "@angular/common/http";
import {Router, CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private http:HttpClient, private route:Router) { 
  }

canActivate():boolean{
	const token = localStorage.getItem('token');
	const auth = localStorage.getItem('auth');
	if(auth){
		return true;
	}else{
		this.route.navigate(["/login"]);
	}
}


}
