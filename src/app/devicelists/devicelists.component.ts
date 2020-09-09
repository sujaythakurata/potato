import { Component, OnInit, OnDestroy } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Subscription} from 'rxjs';
import{Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {FormGroup, FormControl, Validators} from "@angular/forms";	

@Component({
  selector: 'app-devicelists',
  templateUrl: './devicelists.component.html'
})
export class DevicelistsComponent implements OnInit, OnDestroy {


  //FormControl
  lat = new FormControl('', Validators.pattern('[0-9]+(.)*'))
  long = new FormControl('', Validators.pattern('[0-9]+(.)*'))
  dev_id = new FormControl('', Validators.pattern('[0-9]'))

	public data:{};
	public flag:boolean = true;
	public sub:Subscription;
  public sub1:Subscription;
  public sub2:Subscription;
  public sub3:Subscription;
  public id:Number;
  public header = {Authorization:`Bearer ${localStorage.getItem('token')}`};
  public role = localStorage.getItem('role');
   get_url = environment.api+"api/devicelist";
   add_url = environment.api+"api/device";
   delete_url = environment.api+"api/delete";
   edit_url = environment.api+"api/deviceupdate";
   super_ = '1';
   admin_ = '2';
  constructor(private http:HttpClient, public route:Router) { }

  ngOnInit() {
    this.flag = true;
  	this.getdata();
  }

  add_device(id:any, name:any, con:any, loc:any, lat:any, long:any, ele):void{
  	const body = {id:id.value, name:name.value, country:con.value, loc:loc.value, lat:lat.value, long:long.value};
  	this.sub1 = this.http.post(this.add_url, body, {headers:this.header}).subscribe(val=>{
      ele.click();
      if(val['status']==0){
        id.value = null;
        name.value = null;
        con.value = null;
        loc.value = null,
        lat.value = null;
        long.value = null;
        this.getdata();
        alert("Device is created");
        
      }else if(val['status']==409){
          id.value = null;
          name.value = null;
          con.value = null;
          loc.value = null,
          lat.value = null;
          long.value = null;
          alert(val["msg"]);
      }else{
        alert("Internal Server Error");
      }

  	},
  (err)=>{
    alert(err["error"]["msg"]);
      this.flag = false;
      this.sub.unsubscribe();
      if(this.sub1)
        this.sub1.unsubscribe();
      if(this.sub2)
        this.sub2.unsubscribe();
      if(this.sub3)
        this.sub3.unsubscribe();
      localStorage.clear()
      this.route.navigateByUrl('/login')
  }

    );
  	
  }


getdata(){
  this.sub = this.http.get(this.get_url, {headers:this.header}).subscribe(val=>{
    this.data = val;
  },
  (err)=>{
    alert(err["error"]["msg"]);
      this.flag = false;
      this.sub.unsubscribe();
      if(this.sub1)
        this.sub1.unsubscribe();
      if(this.sub2)
        this.sub2.unsubscribe();
      if(this.sub3)
        this.sub3.unsubscribe();
      localStorage.clear()
      this.route.navigateByUrl('/login')
  }
  );
}

ngOnDestroy(){
	this.flag = false;
	this.sub.unsubscribe();
    if(this.sub1)
      this.sub1.unsubscribe();
    if(this.sub2)
      this.sub2.unsubscribe();
    if(this.sub3)
      this.sub3.unsubscribe();
}

  set(id:any, name:any, con:any, lat:any, long:any, loc:any, data:any):void{
      id.value = data.device_id;
      this.id = data.device_id;
      name.value = data.device_name;
      con.value = data.country;
      loc.value = data.location_name,
      lat.value = data.latitude;
      long.value = data.longitude;
  }

  delete(id):void{
      const body = {id:id};
      this.sub2 = this.http.post(this.delete_url, body, {headers:this.header}).subscribe(val=>{
      alert("device deleted")
      this.getdata()
      },
        (err)=>{
    alert(err["error"]["msg"]);
      this.flag = false;
      this.sub.unsubscribe();
      if(this.sub1)
        this.sub1.unsubscribe();
      if(this.sub2)
        this.sub2.unsubscribe();
      if(this.sub3)
        this.sub3.unsubscribe();
      localStorage.clear()
      this.route.navigateByUrl('/login')
  }

      );
  }

  update_device(id:any, name:any, con:any, loc:any, lat:any, long:any, ele):void{    
    const body = {device_id:this.id,id:id.value, name:name.value, country:con.value, loc:loc.value, lat:lat.value, long:long.value};
    this.sub3 = this.http.post(this.edit_url, body, {headers:this.header}).subscribe(val=>{
      ele.click();
      id.value = null;
      name.value = null;
      con.value = null;
      loc.value = null,
      lat.value = null;
      long.value = null;
      alert("update done");
      this.getdata();
    },
  (err)=>{
    alert(err["error"]["msg"]);
      this.flag = false;
      this.sub.unsubscribe();
      if(this.sub1)
        this.sub1.unsubscribe();
      if(this.sub2)
        this.sub2.unsubscribe();
      if(this.sub3)
        this.sub3.unsubscribe();
      localStorage.clear()
      this.route.navigateByUrl('/login')
  }
    );


  }

}
