import { Component, OnInit, OnDestroy} from '@angular/core';
import {Chart } from 'chart.js';
import{ActivatedRoute, Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import * as moment from 'moment';
import {environment} from "../../environments/environment";
@Component({
  selector: 'app-graphical26',
  templateUrl: './graphical26.component.html'
})
export class Graphical26Component implements OnInit, OnDestroy {

  start:String;
  end:String;
  sub:Subscription;
  url:any;
  flag:boolean;
  id:Number;
  data:any;
  public header = {Authorization:`Bearer ${localStorage.getItem('token')}`};
  base = environment.api+"history/data?id=";
  default:String;
  defaultend:String;
  table_base = environment.api+"history/table?id=";
  table_url;
  tabledata;
  sub_table:Subscription;



  constructor(private route:ActivatedRoute, private http:HttpClient, private router:Router) { }
  areaChart;
  areaChart2;
  areaChart8;
  areaChart16;
  graphicalview=true;
  listview=false;
  graphical()
  {
    this.graphicalview=true;
    this.listview=false;
  }
  list()
  {
    this.graphicalview=false;
    this.listview=true;
  }
  ngOnInit() {

    this.flag = true;
    ///get route id
    this.route.params.subscribe(parm=>{
      this.id = parm.id;
    });
    //get today date
    this.end = moment().format('YYYY-MM-DD');
    this.start = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.default = this.start;
    this.defaultend = this.end;

    this.url =`${this.base}${this.id}&start=${this.start}%2000:00:00&end=${this.end}%2023:59:59`;
    this.table_url =`${this.table_base}${this.id}&start=${this.start}%2000:00:00&end=${this.end}%2023:59:59`;

  this.areaChart = new Chart("areaChart", {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'Solar',
          backgroundColor: 'rgba(60,141,188,0.9)',
          borderColor: 'rgba(60,141,188,0.8)',
          pointRadius: 2,
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
          pointRadius: 2,
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
          pointRadius: 2,
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
      // maintainAspectRatio: false,
      responsive: true,
      animation:false,
      scales: {
        xAxes: [{
          gridLines: {
          //  display: false,
          },
          ticks:{fontSize:10}
        }],
        yAxes: [
          {
            ticks: {
              // max: 100,
              // min: 0,
              // stepSize: 60,
              // fontSize:10
            },
            gridLines: {
              display: false,
            },
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
          pointRadius: 2,
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
          pointRadius: 2,
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
      animation:false,
      // maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
          //  display: false,
          },
          ticks:{fontSize:10, stepSize: 100, maxTicksLimit: 20,autoSkip:true}
        }],
        yAxes: [
          {
            ticks: {
              // max: 100,
              // min: 0,
              // stepSize: 60,
              // fontSize: 10
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
          pointRadius: 2,
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
          pointRadius: 2,
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
      animation:false,
      // maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
          //  display: false,
          },
          ticks:{fontSize:10, stepSize: 100, maxTicksLimit: 20,autoSkip:true}
        }],
        yAxes: [
          {
            ticks: {
              // max: 100,
              // min: 0,
              // stepSize: 60,
              // fontSize:10
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
          pointRadius: 2,
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
          pointRadius: 2,
          pointColor: 'orange',
          pointStrokeColor: '#c1c7d1',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          fill: false,
          data: []
        },
        {
          label: 'Tb Count',
          backgroundColor: 'green',
          borderColor: 'green',
          pointRadius: 2,
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
      animation:false,
      // maintainAspectRatio: false,
      responsive: true,
      scales: {
        xAxes: [{
          gridLines: {
          //  display: false
          },
          ticks:{fontSize:10, stepSize: 100, maxTicksLimit: 20,autoSkip:true}
        }],
        yAxes: [
          {
            ticks: {
              // max: 100,
              // min: 0,
              // stepSize: 60,
              // fontSize:10
            },
            gridLines: {
              display: false,
            }
          }]
      }
    }
  });

  this.getdata();
  this.get_table_data();


  }


search(start, end){
  this.start = start.value;
  this.end = end.value;
  this.url =`${this.base}${this.id}&start=${this.start}%2000:00:00&end=${this.end}%2023:59:59`;
  this.table_url =`${this.table_base}${this.id}&start=${this.start}%2000:00:00&end=${this.end}%2023:59:59`;
  this.getdata();
  this.get_table_data();
}



getdata(){
  this.sub = this.http.get(this.url, {headers:this.header}).subscribe((data:any)=>{
        this.data = data;
        console.log(this.data);
        let sl = data.slice(0).reverse().map(data=>{return data.solar});
        let ws = data.slice(0).reverse().map(data=>{return data.wind_speed});
        let wn = data.slice(0).reverse().map(data=>{return data.wind_direction});
        let vp = data.slice(0).reverse().map(data=>{return data.vapour_pressure});
        let ap = data.slice(0).reverse().map(data=>{return data.atm_pressure});
        let tm = data.slice(0).reverse().map(data=>{return data.air_temperature});
        let hm = data.slice(0).reverse().map(data=>{return data.relative_humidity});
        let rain = data.slice(0).reverse().map(data=>{return data.rainfall});
        let tbrain = data.slice(0).reverse().map(data=>{return data.tb_rainfall})
        let tb = data.slice(0).reverse().map(data=>{return data.tb_count})
        let label = data.slice(0).reverse().map(data=>{
           let date = new Date(data.timing);
           return moment(date).format('hh:mm:ss');
         });


        this.areaChart.data.datasets[0].data = sl;
        this.areaChart.data.datasets[1].data = wn;
        this.areaChart.data.datasets[2].data = ws;
        this.areaChart.data.labels = label;
        this.areaChart.update();
        this.areaChart2.data.datasets[0].data = vp;
        this.areaChart2.data.datasets[1].data = ap;
        this.areaChart2.data.labels = label;
        this.areaChart2.update()
        this.areaChart8.data.datasets[0].data = tm;
        this.areaChart8.data.datasets[1].data = hm;
        this.areaChart8.data.labels = label;
        this.areaChart8.update()
        this.areaChart16.data.datasets[0].data = rain;
        this.areaChart16.data.datasets[1].data = tbrain;
        this.areaChart16.data.datasets[2].data = tb;
        this.areaChart16.data.labels = label;
        this.areaChart16.update()

        if(this.flag)
          setTimeout(()=>{this.getdata()}, 50000);

  },
  (err)=>{
    alert(err["error"]["msg"]);
    this.flag = false;
    this.sub.unsubscribe();
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

  )
}
get_table_data(){
  this.sub_table = this.http.get(this.table_url, {headers:this.header}).subscribe((data:any)=>{
    // this.tabledata = data;
    console.log(data);
    setTimeout(()=>{
      this.get_table_data();
    }, 500000);
  },
  (err)=>{
    alert(err["error"]["msg"]);
    this.flag = false;
    this.sub.unsubscribe();
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
  )
}
  
  ngOnDestroy(){
    this.flag = false;
    this.sub.unsubscribe();
    this.sub_table.unsubscribe();
  }




}
