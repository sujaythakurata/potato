import { Component, OnInit } from '@angular/core';
import {Chart } from 'chart.js';
@Component({
  selector: 'app-graphical26',
  templateUrl: './graphical26.component.html'
})
export class Graphical26Component implements OnInit {

  constructor() { }
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
  this.areaChart = new Chart("areaChart", {
    type: 'line',
    data: {
      labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7", "day 8", "day 9", "day 10",],
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
          data: [46, 86, 84, 82, 50, 32, 20, 48, 68, 88]
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
          data: [48, 58, 38, 26, 48, 68, 96, 88, 86, 88]
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
          data: [48, 68, 96, 88, 86, 88,48, 58, 38, 26, ]
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
  this.areaChart2 = new Chart("areaChart2", {
    type: 'line',
    data: {
      labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7", "day 8", "day 9", "day 10",],
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
          data: [46, 86, 84, 82, 50, 32, 20, 48, 68, 88]
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
          data: [48, 58, 38, 26, 48, 68, 96, 88, 86, 88]
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
  this.areaChart8 = new Chart("areaChart8", {
    type: 'line',
    data: {
      labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7", "day 8", "day 9", "day 10",],
      datasets: [
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
          data: [46, 86, 20, 48, 68, 88,84, 82, 50, 32]
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
          data: [48, 58, 38, 26, 48, 68, 96, 88, 86, 88]
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
  this.areaChart16 = new Chart("areaChart16", {
    type: 'line',
    data: {
      labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7", "day 8", "day 9", "day 10",],
      datasets: [
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
          data: [46, 86, 20, 48, 68, 88,84, 82, 50, 32]
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
          data: [48, 58, 38, 26, 48, 68, 96, 88, 86, 88]
        },
        {
          label: 'Tb Count',
          backgroundColor: 'green',
          borderColor: 'green',
          pointRadius: false,
          pointColor: 'orange',
          pointStrokeColor: '#c1c7d1',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          fill: false,
          data: [48, 26, 48, 68, 96,  86, 88,58, 38,88,]
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

  }
}
