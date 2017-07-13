import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as Chart from 'chart.js';

import { SocketService } from '../socket.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  newQuotesSub:Subscription;
  chart:Chart;

  constructor(private socketService:SocketService) { }

  ngOnInit() {
    // Chart.js 
    const canvas = <HTMLCanvasElement>document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["red", "blue", "yellow"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          borderColor: this.getRandomColor(),
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              // beginAtZero: true
            }
          }]
        }
      }
    });

    // Test updating chart
    setTimeout(() => {
      const color = this.getRandomColor();
      this.chart.data.datasets.push({label: "Test", data:[1,2,3], borderColor: color, fill: false});
      this.chart.update();
    }, 1000);

    // Subscribe to "new quote" event
    this.newQuotesSub = this.socketService.getNewQuotes().subscribe(quote => {
      console.log(quote);
    });
  }


  getRandomColor(){
    const r = Math.random()*255;
    const g = Math.random()*255;
    const b = Math.random()*255;

    return `rgb(${r},${g},${b})`;
  }

}
