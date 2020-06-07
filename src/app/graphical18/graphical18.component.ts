import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as $ from 'jquery';
import 'jquery-knob';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-graphical18',
  templateUrl: './graphical18.component.html'
})
export class Graphical18Component implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
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
  solar = [];
  solar2 = [];
  winddirectio = [];
  winddirectio2 = [];
  windspeed = [];
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
    this.http.post("http://localhost:3000/datarecords", this.obj).subscribe(
      res => {
        this.coins = res;
        /*  this.coins = [];
         for (let key in res) {
           this.coins.push(res[key]);
         }*/
        //console.log(this.coins);
        //  localStorage.setItem("jvn", JSON.stringify(res));
        //  this.myData = JSON.parse(localStorage.getItem("jvn"));
      }
    );
  }
  a = 1;
  b = 7;
  obj = { startid: this.a, endid: this.b };
  obj2;
  obj3;
  obj8;
  previous() {
    this.a = this.a - 7;
    this.b = this.b - 7;
    this.obj3 = { startid: this.a, endid: this.b };
    this.http.post("http://localhost:3000/datarecords", this.obj3).subscribe(
      res => {
        this.coins = res;
        /*  this.coins = [];
         for (let key in res) {
           this.coins.push(res[key]);
         }*/
        //console.log(this.coins);
        //  localStorage.setItem("jvn", JSON.stringify(res));
        //  this.myData = JSON.parse(localStorage.getItem("jvn"));
      }
    );
  }
  next() {
    this.a = this.a + 7;
    this.b = this.b + 7;
    this.obj2 = { startid: this.a, endid: this.b };
    this.http.post("http://localhost:3000/datarecords", this.obj2).subscribe(
      res => {
        this.coins = res;
        /*  this.coins = [];
         for (let key in res) {
           this.coins.push(res[key]);
         }*/
        //console.log(this.coins);
        //  localStorage.setItem("jvn", JSON.stringify(res));
        //  this.myData = JSON.parse(localStorage.getItem("jvn"));
      }
    );
  }
  a1 = [];
  displaydate = [];
  displaydate2 = [];
  vp = [];
  ap = [];
  vp2 = [];
  ap2 = [];
  te = [];
  te2 = [];
  hu = [];
  hu2 = [];
  ra = [];
  ra2 = [];
  tbra = [];
  tbra2 = [];
  dataretrive() {
    this.todaydate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.obj8 = { todaydate: this.todaydate };
    this.http.post("http://localhost:3000/solar", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.solar.push(Number(res[key].solar));
        }
        localStorage.setItem("jvn", JSON.stringify(this.solar));
        //console.log(this.solar);
      }
    );
    this.solar2 = JSON.parse(localStorage.getItem("jvn"));
    this.http.post("http://localhost:3000/winddirection", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.winddirectio.push(Number(res[key].wind_direction));
        }
        localStorage.setItem("jvn1", JSON.stringify(this.winddirectio));
        //console.log(this.winddirectio);
      }
    );
    this.winddirectio2 = JSON.parse(localStorage.getItem("jvn1"));
    this.http.post("http://localhost:3000/windspeed", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.windspeed.push(Number(res[key].wind_speed));
        }
        localStorage.setItem("jvn2", JSON.stringify(this.windspeed));
      }
    );
    this.windspeed2 = JSON.parse(localStorage.getItem("jvn2"));
    this.http.post("http://localhost:3000/temperature", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.te.push(Number(res[key].air_temperature));
        }
        localStorage.setItem("jvn3", JSON.stringify(this.te));
      }
    );
    this.te2 = JSON.parse(localStorage.getItem("jvn3"));
    this.http.post("http://localhost:3000/humidity", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.hu.push(Number(res[key].relative_humidity));
        }
        localStorage.setItem("jvn4", JSON.stringify(this.hu));
      }
    );
    this.hu2 = JSON.parse(localStorage.getItem("jvn4"));

    this.http.post("http://localhost:3000/vapour", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.vp.push(Number(res[key].vapour_pressure));
        }
        localStorage.setItem("jvn5", JSON.stringify(this.vp));
      }
    );
    this.vp2 = JSON.parse(localStorage.getItem("jvn5"));

    this.http.post("http://localhost:3000/air", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.ap.push(Number(res[key].atm_pressure));
        }
        localStorage.setItem("jvn6", JSON.stringify(this.ap));
      }
    );
    this.ap2 = JSON.parse(localStorage.getItem("jvn6"));
    this.http.post("http://localhost:3000/rainfall", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.ra.push(Number(res[key].rainfall));
        }
        localStorage.setItem("jvn7", JSON.stringify(this.ra));
      }
    );
    this.ra2 = JSON.parse(localStorage.getItem("jvn7"));
    this.http.post("http://localhost:3000/tbrainfall", this.obj8).subscribe(
      res => {
        for (let key in res) {
          this.tbra.push(Number(res[key].tb_rainfall));
        }
        localStorage.setItem("jvn8", JSON.stringify(this.tbra));
      }
    );
    this.tbra2 = JSON.parse(localStorage.getItem("jvn8"));




    //console.log(this.todaydate);
    this.http.post("http://localhost:3000/date", this.obj8).subscribe(
      res => {
        // console.log(res);
        for (let key in res) {
          this.datetime.push(res[key].timing);
        }
        localStorage.setItem("jvn12", JSON.stringify(this.datetime));
      }
    );
    this.datetime2 = JSON.parse(localStorage.getItem("jvn12"));
    console.log(this.datetime2);
    // console.log(this.solar2);
  }
  ngOnInit(): void {
    // console.log(this.obj);
    $(function () {
      $(".knob").knob();
    });
    /*
        setInterval(() => {
          this.dataretrive();
        }, 1000);
    */

    this.dataretrive();
    // console.log(this.todaydate);
    this.myChart = new Chart("myChart", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
    this.vapourpressure = new Chart("vapourpressure", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
    this.airpressure = new Chart("airpressure", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
    this.airtemperature = new Chart("airtemperature", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
    this.winddirection = new Chart("winddirection", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
      }
    });
    this.relativehumidity = new Chart("relativehumidity", {
      type: 'doughnut',
      data: {
        labels: ["Blue", "red"],
        datasets: [{
          label: '# of Votes',
          data: [10, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
      }
    });
    this.areaChart = new Chart("areaChart", {
      type: 'line',
      data: {
        labels: this.datetime2,
        datasets: [
          {
            label: 'Solar',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.solar2
          },
          {
            label: 'Wind Direction',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.winddirectio2
          },
          {
            label: 'Wind Speed',
            backgroundColor: 'green',
            borderColor: 'green',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.windspeed2
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 4
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                max: 1200,
                min: 0,
                stepSize: 400
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
        labels: this.datetime2,
        datasets: [
          {
            label: 'Solar',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.solar2
          },
          {
            label: 'Wind Direction',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.winddirectio2
          },
          {
            label: 'Wind Speed',
            backgroundColor: 'green',
            borderColor: 'green',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.windspeed2
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                max: 1200,
                min: 0,
                stepSize: 400
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
        labels: this.datetime2,
        datasets: [
          {
            label: 'Vapour Pressure',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.vp2
          },
          {
            label: 'Air Pressure',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.ap2
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 4
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                max: 120,
                min: 0,
                stepSize: 40
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
        labels: this.datetime2, datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.te2
          },
          {
            label: 'Humidity',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.hu2
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 4
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                max: 80,
                min: 0,
                stepSize: 40
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
        labels: this.datetime2, datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.ra2
          },
          {
            label: 'Tb Rainfall',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.tbra2
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 4
            },
            gridLines: {
              //  display: false,
            }
          }],
          yAxes: [
            {
              ticks: {
                max: 100,
                min: 0,
                stepSize: 60
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
        labels: this.datetime2, datasets: [
          {
            label: 'Vapour Pressure',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.vp2
          },
          {
            label: 'Air Pressure',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.ap2
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
                max: 120,
                min: 0,
                stepSize: 40
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
        labels: this.datetime2, datasets: [
          {
            label: 'Temperature',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.te2
          },
          {
            label: 'Humidity',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.hu2
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
                max: 100,
                min: 0,
                stepSize: 60
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
        labels: this.datetime2, datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            fill: false,
            data: this.ra2
          },
          {
            label: 'Tb Rainfall',
            backgroundColor: 'orange',
            borderColor: 'orange',
            pointRadius: false,
            pointColor: 'orange',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            fill: false,
            data: this.tbra2
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
                max: 100,
                min: 0,
                stepSize:50
              },
              gridLines: {
                display: false,
              }
            }]
        }
      }
    });

  }

}
