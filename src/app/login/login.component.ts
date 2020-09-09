import { Component, OnInit, OnDestroy } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import {Subscription } from "rxjs";
import {environment} from "../../environments/environment";

@Component ({
   selector: 'my-app',
   encapsulation: ViewEncapsulation.None,
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  sub: Subscription;
  type:String="password";
  login_url = environment.api+"api/login";
  cred_flag:boolean=false;

  login = new FormGroup({
    email: new FormControl("", Validators.email),
    password: new FormControl("", Validators.minLength(8))

  })

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    ngOnInit(){
      this.cred_flag = false;

    }



    onSubmit(){
      
      this.sub = this.http.post(this.login_url, this.login.value).subscribe((data:any)=>{
        if(data['status']==1){
          localStorage.setItem("auth", data['auth']);
          localStorage.setItem("user_id", data['user_id']);
          localStorage.setItem("role", data['role']);
          localStorage.setItem("token", data['token']);
          localStorage.setItem("user_name", data['user_name']);
          this.router.navigate(['/dashboard/home']);
        }else{
          this.cred_flag = true;
        }
        
      },
      (err)=>{
        alert(err['errors']["msg"]);
        if(this.sub)
          this.sub.unsubscribe();
      }

      )
      this.login.reset();

    }

      ngOnDestroy(){
      this.sub.unsubscribe();
    }

  show(){
    if(this.type=='password')
      this.type='text';
    else
      this.type='password';
  }


}