import { Component, OnInit, OnDestroy } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Subscription} from 'rxjs'						

@Component({
  selector: 'app-devicelists',
  templateUrl: './devicelists.component.html'
})
export class DevicelistsComponent implements OnInit, OnDestroy {
	public data:{};
	public flag:boolean = true;
	public sub:Subscription;
  public id:Number;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.flag = true;
  	this.getdata();
  }

  add_device(id:any, name:any, con:any, loc:any, lat:any, long:any):void{
  	const url = "http://localhost:3000/api/device";
  	const body = {id:id.value, name:name.value, country:con.value, loc:loc.value, lat:lat.value, long:long.value};
  	let req = this.http.post(url, body).subscribe(val=>{
  		console.log(val);
  		id.value = null;
  		name.value = null;
  		con.value = null;
  		loc.value = null,
  		lat.value = null;
  		long.value = null;
  	});
  	
  }


getdata(){
  this.sub = this.http.get("http://localhost:3000/api/devicelist").subscribe(val=>{
    this.data = val;
    if(this.flag)
    	setTimeout(()=>{this.getdata()}, 2000);
  });
}

ngOnDestroy(){
	this.flag = false;
	this.sub.unsubscribe();
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
      const url = "http://localhost:3000/api/delete";
      const body = {id:id};
      this.http.post(url, body).subscribe(val=>{
      console.log(val);
      alert("device deleted")
      });
  }

  update_device(id:any, name:any, con:any, loc:any, lat:any, long:any):void{
    const url = "http://localhost:3000/api/deviceupdate";
    const body = {device_id:this.id,id:id.value, name:name.value, country:con.value, loc:loc.value, lat:lat.value, long:long.value};
    let req = this.http.post(url, body).subscribe(val=>{
      console.log(val);
      id.value = null;
      name.value = null;
      con.value = null;
      loc.value = null,
      lat.value = null;
      long.value = null;
      alert("update done");
    });


  }

}
