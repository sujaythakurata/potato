import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  	const d = [1,3, 4, 5, 6 ]
  	const data = [
      {
        latLng: [41.90, 12.45],  
        device: "dev1",
        device_id: 1,
        name  : 'Vatican City',

      },
      {
        latLng: [43.73, 7.41],
        device: "dev2",
        device_id: 2,
        name  : 'Monaco'
      },
      {
        latLng: [-0.52, 166.93],
        
        device: "dev3",
        device_id: 3,
        name  : 'Nauru'
      },
      {
        latLng: [-8.51, 179.21],
        
        device: "dev4",
        device_id: 4,
        name  : 'Tuvalu'
      },
      {
        latLng: [43.93, 12.46],
        
        device: "dev5",
        device_id: 5,
        name  : 'San Marino'
      },
      {
        latLng: [47.14, 9.52],
        
        device: "dev6",
        device_id: 6,
        name  : 'Liechtenstein'
      },
      {
        latLng: [7.11, 171.06],
        
        device: "dev7",
        device_id: 7,
        name  : 'Marshall Islands'
      },
      {
        latLng: [17.3, -62.73],
        
        device: "dev8",
        device_id: 8,
        name  : 'Saint Kitts and Nevis'
      },
      {
        latLng: [3.2, 73.22],
        
        device: "dev9",
        device_id: 9,
        name  : 'Maldives'
      },
      {
        latLng: [35.88, 14.5],
        
        device: "dev10",
        device_id: 10,
        name  : 'Malta'
      },
      {
        latLng: [12.05, -61.75],
        
        device: "dev11",
        device_id: 11,
        name  : 'Grenada'
      },
      {
        latLng: [13.16, -61.23],
        
        device: "dev12",
        device_id: 12,
        name  : 'Saint Vincent and the Grenadines'
      },
      {
        latLng: [13.16, -59.55],
        
        device: "dev13",
        device_id: 13,
        name  : 'Barbados'
      },
      {
        latLng: [17.11, -61.85],
        
        device: "dev14",
        device_id: 14,
        name  : 'Antigua and Barbuda'
      },
      {
        latLng: [-4.61, 55.45],
        
        device: "dev15",
        device_id: 15,
        name  : 'Seychelles'
      },
      {
        latLng: [7.35, 134.46],
        
        device: "dev16",
        device_id: 16,
        name  : 'Palau'
      },
      {
        latLng: [42.5, 1.51],
        
        device: "dev17",
        device_id: 17,
        name  : 'Andorra'
      },
      {
        latLng: [14.01, -60.98],
        
        device: "dev18",
        device_id: 18,
        name  : 'Saint Lucia'
      },
      {
        latLng: [6.91, 158.18],
        
        device: "dev19",
        device_id: 19,
        name  : 'Federated States of Micronesia'
      },
      {
        latLng: [1.3, 103.8],
        
        device: "dev20",
        device_id: 20,
        name  : 'Singapore'
      },
      {
        latLng: [1.46, 173.03],
        
        device: "dev21",
        device_id: 21,
        name  : 'Kiribati'
      },
      {
        latLng: [-21.13, -175.2],
        
        device: "dev22",
        device_id: 22,
        name  : 'Tonga'
      },
      {
        latLng: [15.3, -61.38],
        
        device: "dev23",
        device_id: 23,
        name  : 'Dominica'
      },
      {
        latLng: [-20.2, 57.5],
        
        device: "dev24",
        device_id: 24,
        name  : 'Mauritius'
      },
      {
        latLng: [26.02, 50.55],
        
        device: "dev25",
        device_id: 25,
        name  : 'Bahrain'
      },
      {
        latLng: [0.33, 6.73],
        
        device: "dev26",
        device_id: 26,
        name  : 'São Tomé and Príncipe'
      }
    ]


  	//map config
    $('#world-map').vectorMap({
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
        		'stroke-width': .5,
        		'stroke-opacity': 1
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
    	markers: data,
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
		onMarkerLabelShow: function(e, tip, code){
			tip.html(
				'<b>Location: '+data[code].name+'</b><br/>'+
				'<b>Device: '+data[code].device+'</b><br/>'+
				'<b>Id: '+data[code].device_id+'</b><br/>'
			);
		},
		onMarkerClick: function(e, code){
			console.log(e, code);
			location.href = "https://www.google.com"
		}


  	})



  }





}
