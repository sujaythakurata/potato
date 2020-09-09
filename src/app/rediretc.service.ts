import { Injectable } from '@angular/core';

import {Router, CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RediretcService {

  constructor(private route:Router) { 


  }
  canActivate():boolean{
  	let auth = localStorage.getItem('auth');
  	if(auth)
  		this.route.navigate(['/dashboard/home']);
  	return true;
}

}
