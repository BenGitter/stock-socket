import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as Chart from 'chart.js';

import { SocketService } from '../socket.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, OnDestroy {
  newQuotesSub:Subscription;
  deletedQuotesSub:Subscription;
  chart:Chart;

  xAxisLength:number = 0;

  constructor(
    private socketService:SocketService,
    private stockService:StockService
  ) { }

  ngOnInit() {
    // Chart.js 
    const canvas = <HTMLCanvasElement>document.getElementById("chart");
    const ctx = canvas.getContext("2d");
    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: []
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

    // Subscribe to "new quote" event
    this.newQuotesSub = this.socketService.getNewQuotes().subscribe(quote => {
      this.handleNewQuote(<string> quote);
    });

    // Subscribe to "delete quote" event
    this.deletedQuotesSub = this.socketService.getDeletedQuotes().subscribe(quote => {
      this.handleDeleteQuote(<string> quote);
    });
  }


  getRandomColor(){
    const r = Math.random()*255;
    const g = Math.random()*255;
    const b = Math.random()*255;

    return `rgb(${r},${g},${b})`;
  }

  handleDeleteQuote(quote:string){
    let index;
    for(let i = 0; i < this.chart.data.datasets.length; i++){
      const dataset = this.chart.data.datasets[i];
      if(dataset.label === quote){    
        index = i;
        break;
      }
    }

    if(index >= 0){
      this.chart.data.datasets.splice(index,1);
      this.chart.update();
    }
  }

  handleNewQuote(quote:string){
    this.stockService.getQuoteData(quote).subscribe(json => {
      const series = json.data["Weekly Time Series"];
      const key_series = Object.keys(series).reverse();
      const length = key_series.length;


      // Update X axis
      if(this.xAxisLength < length){
        this.xAxisLength = length;
        this.chart.data.labels = key_series;
        const last = <string>this.chart.data.labels[length-1];
        this.chart.data.labels[length-1] = last.split(" ")[0];
        this.chart.update();

        // Update shorter datasets
        this.chart.data.datasets.forEach((dataset, i) => {
          const set_length = dataset.data.length;
          if(set_length < this.xAxisLength){
            const add_length = this.xAxisLength - set_length;
            let add = [];
            for(let i = 0; i < add_length; i++){
              add.push(0);
            }
            dataset.data = add.concat(dataset.data);
          }
        });
        this.chart.update(0);
      }

      // Add dataset
      let _data = [];
      for(let i = 0; i < (this.xAxisLength-length); i++){
        _data.push(0);
      }
      for(let i = (this.xAxisLength-length); i < this.xAxisLength-1; i++){
        _data.push(series[key_series[i-(this.xAxisLength-length)]]["4. close"]);
      }
      
      this.chart.data.datasets.push({
        label: quote, 
        data: _data, 
        borderColor: this.getRandomColor(),
        fill: false,
        borderWidth: 2,
        pointRadius: 0
      });
      this.chart.update();
    });
  }

  ngOnDestroy(){
    this.newQuotesSub.unsubscribe();
    this.deletedQuotesSub.unsubscribe();
  }
}
