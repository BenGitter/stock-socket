import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  chartDatasets = [{
    label: "X",
    data: [1,2,3]
  }];
  chartLabels = ["a", "b", "c"];
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit() {
  }

}
