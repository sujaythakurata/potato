import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import{Subscription} from "rxjs";
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-graphical18',
  templateUrl: './graphical18.component.html'
})
export class Graphical18Component implements OnInit, OnDestroy {

  id:Number;
  flag:boolean = true;
  sub:Subscription;
  sub_:Subscription;
  sub1:Subscription;
  sub2:Subscription;
  data:any;
  table:any;
  public header = {Authorization:`Bearer ${localStorage.getItem('token')}`};
   data_url = environment.api;
   fulldata_url = environment.api;
   img = environment.routebase;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
    myChart;
    vapourpressure;
    airpressure;
    airtemperature;
    winddirection;
    relativehumidity;
    areaChart;
    areaChart2;
    areaChart8;
    areaChart16;
    areaChart110;
    areaChart112;
    areaChart118;
    areaChart1116;
    myData;
    coins;
   
    solar2 = [];
    
    winddirectio2 = [];
    
    windspeed2 = [];
    datetime = [];
    datetime2 = [];
    valuesOnly;
    totals = [];
    tableth = true;
    graphicalview = true;
    listview = false;
    currentDate;
    todaydate;
    arrasize;
    todaydatefind = [];
  graphical() {
    this.graphicalview = true;
    this.listview = false;
  }

  list() {
    this.graphicalview = false;
    this.listview = true;
  }
  ngOnInit(): void {
     this.graphicalview = true;
     this.listview = false;
     this.flag = true;
     ///get route id
     this.route.params.subscribe(parm=>{
     this.id = parm.id;
     this.data_url = this.data_url+"live/data/"+this.id;
     this.fulldata_url = this.fulldata_url+"live/fulldata/"+this.id;
    });

    this.myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: ["#4775d1", "#c2d1f0"],
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.vapourpressure = new Chart("vapourpressure", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: ["#4775d1", "#c2d1f0"],
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.airpressure = new Chart("airpressure", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: ["#4775d1", "#c2d1f0"],
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.airtemperature = new Chart("airtemperature", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: ["#4775d1", "#c2d1f0"],
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.winddirection = new Chart("winddirection", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: ["#4775d1", "#c2d1f0"],
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.relativehumidity = new Chart("relativehumidity", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: ["#4775d1", "#c2d1f0"],
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 80,
        legend: {
          display: false
        },
        tooltips:{
          enabled:false
        }
      }
    });
    this.areaChart = new Chart("areaChart", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Solar',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Wind Direction',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
          {
            label: 'Wind Speed',
            backgroundColor: 'green',
            borderColor: 'green',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 8
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 120,
                // min: 0,
                stepSize: 10,
                fontSize:8,
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }

    });

    this.areaChart110 = new Chart("areaChart110", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Solar',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Wind Direction',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
          {
            label: 'Wind Speed',
            backgroundColor: 'green',
            borderColor: 'green',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 14
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 120,
                // min: 0,
                
                
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }

    });
    this.areaChart2 = new Chart("areaChart2", {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Vapour Pressure',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data:[]
          },
          {
            label: 'Air Pressure',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 8
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 120,
                // min: 0,
                stepSize: 10,
                fontSize:8,
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });
    this.areaChart8 = new Chart("areaChart8", {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Humidity',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 8
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 80,
                // min: 0,
                stepSize: 10,
                fontSize:8,
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });
    this.areaChart16 = new Chart("areaChart16", {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Tb Rainfall',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 8
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 100,
                // min: 0,
                stepSize: 10,
                fontSize:8,
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });
    this.areaChart118 = new Chart("areaChart118", {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: 'Vapour Pressure',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Air Pressure',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 120,
                // min: 0,
                // stepSize: 10,
                // fontSize:8,
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });
    this.areaChart112 = new Chart("areaChart112", {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Humidity',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 100,
                // min: 0,
                // stepSize: 60
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });
    this.areaChart1116 = new Chart("areaChart1116", {
      type: 'line',
      data: {
        labels: [], 
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            // pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: []
          },
          {
            label: 'Tb Rainfall',
            backgroundColor: 'orange',
            borderColor: 'orange',
            // pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: []
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                // max: 100,
                // min: 0,
                // stepSize:50
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });
     this.getdata();
     this.getfulldata();
  }


  getdata(){
    this.sub = this.http.get(this.data_url, {headers:this.header}).subscribe((data:any)=>{
      this.data = data;
      this.myChart.data.datasets[0].data = [data[0].wind_speed, 100-(data[0].wind_speed)];
      this.vapourpressure.data.datasets[0].data = [data[0].vapour_pressure, 100-(data[0].vapour_pressure)];
      this.airpressure.data.datasets[0].data = [data[0].atm_pressure, 200-data[0].atm_pressure];
      this.airtemperature.data.datasets[0].data = [data[0].air_temperature, 100-(data[0].air_temperature)];
      this.winddirection.data.datasets[0].data = [(data[0].wind_direction), 100-(data[0].wind_direction)];
      this.relativehumidity.data.datasets[0].data = [data[0].relative_humidity, 100-(data[0].relative_humidity)];
      this.myChart.update();
      this.vapourpressure.update();
      this.airpressure.update();
      this.airtemperature.update();
      this.winddirection.update();
      this.relativehumidity.update();
      if(this.flag)
        setTimeout(()=>{this.getdata()}, 2000);

    },
      (err)=>{
          alert(err["error"]["msg"]);
          this.flag = false;
          this.sub.unsubscribe();
          this.sub_.unsubscribe();
          localStorage.clear();
          this.router.navigateByUrl('/login')
  }



    )

  }

  getfulldata(){
    this.sub_ = this.http.get(this.fulldata_url, {headers:this.header}).subscribe((data:any)=>{
      this.table = data.slice(0).reverse();
        let sl = data.map(data=>{return data.solar});
        let ws = data.map(data=>{return data.wind_speed});
        let wn = data.map(data=>{return data.wind_direction});
        let vp = data.map(data=>{return data.vapour_pressure});
        let ap = data.map(data=>{return data.atm_pressure});
        let tm = data.map(data=>{return data.air_temperature});
        let hm = data.map(data=>{return data.relative_humidity});
        let rain = data.map(data=>{return data.rainfall});
        let tbrain = data.map(data=>{return data.tb_rainfall})
        let label = data.map(data=>{
           let date = new Date(data.timing);
           return date.toLocaleTimeString();
         })
        
        this.areaChart.data.datasets[0].data = sl;
        this.areaChart.data.datasets[1].data = wn;
        this.areaChart.data.datasets[2].data = ws;
        this.areaChart.data.labels = label;
        this.areaChart.update();
        this.areaChart110.data.datasets[0].data = sl;
        this.areaChart110.data.datasets[1].data = wn;
        this.areaChart110.data.datasets[2].data = ws;
        this.areaChart110.data.labels = label;
        this.areaChart110.update();
        this.areaChart2.data.datasets[0].data = vp;
        this.areaChart2.data.datasets[1].data = ap;
        this.areaChart2.data.labels = label;
        this.areaChart2.update()
        this.areaChart118.data.datasets[0].data = vp;
        this.areaChart118.data.datasets[1].data = ap;
        this.areaChart118.data.labels = label;
        this.areaChart118.update()
        this.areaChart8.data.datasets[0].data = tm;
        this.areaChart8.data.datasets[1].data = hm;
        this.areaChart8.data.labels = label;
        this.areaChart8.update()
        this.areaChart112.data.datasets[0].data = tm;
        this.areaChart112.data.datasets[1].data = hm;
        this.areaChart112.data.labels = label;
        this.areaChart112.update()
        this.areaChart16.data.datasets[0].data = rain;
        this.areaChart16.data.datasets[1].data = tbrain;
        this.areaChart16.data.labels = label;
        this.areaChart16.update()
        this.areaChart1116.data.datasets[0].data = rain;
        this.areaChart1116.data.datasets[1].data = tbrain;
        this.areaChart1116.data.labels = label;
        this.areaChart1116.update()
        if(this.flag)
          setTimeout(()=>{this.getfulldata()}, 2000);
    },
    (err)=>{
          alert(err["error"]["msg"]);
          this.flag = false;
          this.sub.unsubscribe();
          this.sub_.unsubscribe();
          localStorage.clear();
          this.router.navigateByUrl('/login')
  }


    )
  }

  ngOnDestroy(){
    this.flag = false;
    this.sub.unsubscribe();
    this.sub_.unsubscribe();
  }

}
