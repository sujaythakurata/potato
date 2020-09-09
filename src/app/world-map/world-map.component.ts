import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Subscription} from "rxjs";
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

declare var $: any;
@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit, OnDestroy {

  public data:any;
  public map:any;
  public flag:boolean = true;
  public sub:Subscription;
  public header = {Authorization:`Bearer ${localStorage.getItem('token')}`};
  public get_url = environment.api+"api/devicelist";
  public routebase = environment.routebase;
  constructor(private http:HttpClient, private route:Router) { }

  ngOnInit() {
    this.flag = true;
    this.map = $('#world-map').vectorMap({
    	map : 'world_mill_en',
    	backgroundColor: "#e6faff",
    	markersSelectableOne: true,
    	normalizeFunction: 'polynomial',
    	hoverOpacity: 0.7,
    	hoverColor: false,
    	regionStyle: {
     		initial: {
        		fill: '#ffffff',
        		'fill-opacity': 1,
        		stroke: '#4775d1',
        		'stroke-width': .2,
        		
      		},
      		hover : {
      			fill: "#0044cc",
        		'fill-opacity': 1,
        		cursor: 'pointer'
     		 },
    	},
    	regionLabelStyle:{
    		initial:{
    			"font-family": "Roboto",
    			"font-size": 12,
    		}
    	},
    	markers: [],
    	markerStyle:{
  			initial: {
  				fill:"#e6004c",
  				"fill-opacity": 1,
			    "stroke-width": 2,
			    "stroke-opacity": .5,
			    r: 5,
			    stroke:"#cc0044"

  			},
			hover: {
			    stroke: '#cc0044',
			    "stroke-width": 5,
			    "stroke-opacity": .4,
			    cursor: 'pointer'
			},
			selected: {
    			fill: '#0077b3'
  			},
		  },
  		onMarkerLabelShow: (e, tip, code)=>{
        tip[0].style.backgroundColor="#1a1a1a";
        tip[0].style.height = "auto";
        tip[0].style.width = "auto";
        tip[0].style.fontSize = "1em"
  			tip.html(
  				'<b style="text-transform: capitalize">Location: '+this.data[code].name+'</b><br/>'+
  				'<b style="text-transform: capitalize">Device: '+this.data[code].device+'</b><br/>'+
  				'<b style="text-transform: capitalize">Id: '+this.data[code].device_id+'</b><br/>'
  			);
  		},
  		onMarkerClick:(e, code, data)=>{
        //let url = `/potato/dashboard/live/${this.data[code].device_id}`; 
        let url = `${this.routebase}dashboard/live/${this.data[code].device_id}`;  
  			location.href = url;
  		}
  	})

    this.getdata();
  }


getdata(){
  this.sub = this.http.get(this.get_url, {headers:this.header}).subscribe(async(val:any)=>{
    this.data =  [];
    for (let i = 0; i < val.length; ++i) {
      let obj = {
        latLng:[val[i].latitude, val[i].longitude],
        device: val[i].device_name,
        device_id: val[i].device_id,
        name: val[i].location_name,
      }
      this.data.push(obj);

    }
    
    var map = $('#world-map').vectorMap('get', 'mapObject');
    map.addMarkers(this.data, []);
    if(this.flag)
      setTimeout(()=>{this.getdata()}, 2000);

  },
  (err)=>{
        alert(err["error"]["msg"]);
        this.flag = false;
        if(this.sub)
          this.sub.unsubscribe();
        localStorage.clear();
        this.route.navigateByUrl('/login');

  }
  );
}

  ngOnDestroy(){
    this.flag = false;
    this.sub.unsubscribe();
  }

}
