import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit, OnDestroy {

  adduser_url = environment.api+"api/adduser";
  getuser_url = environment.api+"api/userlist";
  delete_url = environment.api+"api/deleteuser";
  routebase = environment.routebase;
  userid = localStorage.getItem('user_id');
  user_role = localStorage.getItem('role');
  null = null;
  super_ = '1';
  admin_ = '2';

  del:Subscription;

	user = new FormGroup({
		username: new FormControl("", [Validators.required, Validators.minLength(3)]),
		email: new FormControl("", [Validators.required, Validators.minLength(1), Validators.email]),
		role: new FormControl("", [Validators.required, Validators.min(0)]),
		password: new FormControl("", [Validators.required, Validators.minLength(8)])
	});

	sub:Subscription;
	sub_get:Subscription;
	data:any;
	flag:boolean;
  public header = {Authorization:`Bearer ${localStorage.getItem('token')}`};
  public role = localStorage.getItem('role');
  type:String='password';
  constructor(private http:HttpClient, private route:Router) { }

  ngOnInit() {
  	this.flag = true;
  	this.getdata();
  	
  }
  onsubmit(ele){
  	const obj = this.user.value;
  	this.sub = this.http.post(this.adduser_url, obj, {headers:this.header}).subscribe((val:any)=>{
  		ele.click();
      if(val['status']==1){
  			alert("User Is created");
        this.getdata();
  		}else{
        alert(val['msg']);
      }
  	},
    (err)=>{
      alert(err['error']['msg']);
      this.flag=false;
      if(this.sub)
        this.sub.unsubscribe();
      if(this.del)
        this.del.unsubscribe();
      this.sub_get.unsubscribe();
      localStorage.clear();
      this.route.navigateByUrl('/login');

    }
    );
  	this.user.reset();
  }


  ngOnDestroy(){
  	if(this.sub)
      this.sub.unsubscribe();
  	this.flag = false;
  	this.sub_get.unsubscribe();
    if(this.del)
      this.del.unsubscribe();
  }

  getdata(){
  	this.sub_get = this.http.get(this.getuser_url,{ headers:this.header}).subscribe((data:any)=>{
      this.data = data;
  	},
    (err)=>{
      alert(err['error']['msg']);
      this.flag=false;
      if(this.sub)
        this.sub.unsubscribe();
      this.sub_get.unsubscribe();
      localStorage.clear()
      this.route.navigateByUrl('/login');
    }
    )
  }

  show(){
    if(this.type=='password')
      this.type='text';
    else
      this.type='password';
  }

  delete(id){
    this.del = this.http.post(this.delete_url, {"user_id":id}, {headers:this.header}).subscribe((val:any)=>{
      if(val["status"]==1){
        alert("User Is Deleted");
        this.getdata();
      }else{
        alert("Some error in Server");
      }
    },
    (err)=>{
      alert(err['error']['msg']);
      this.flag=false;
      if(this.sub)
        this.sub.unsubscribe();
      if(this.del)
        this.del.unsubscribe();
      this.sub_get.unsubscribe();
      localStorage.clear();
      this.route.navigateByUrl('/login');

    }
  )

  }


}
