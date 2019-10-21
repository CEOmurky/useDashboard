import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartComponent } from 'eediom-sdk';

@Component({
  selector: 'chart-wrapper',
  templateUrl: './chart-wrapper.component.html',
  styleUrls: ['./chart-wrapper.component.less'],
})
export class ChartWrapperComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartComponent: ChartComponent;
  @Input() set records(records: any[]) {
    this._records = records;
    if (!this.rendered) return;

    this.chartComponent.update(this.chart, this.records);
  }

  get records(): any[] {
    return this._records;
  }
  @Input() set chart(chart: Chart) {
    if (!chart) return;

    this._chart = chart;
    this.initChart();
  }

  get chart(): Chart {
    return this._chart;
  }

  ngOnInit(): void {
    this.initChart();
  }

  private chartConfig: Chart;
  private rendered: boolean = false;
  private _records: any[];
  private _chart: Chart;
  constructor() {}

  OnInit() {}

  initChart(): void {
    this.chartComponent.render(null, this._chart);
  }

  onRender(): void {
    console.log('onChartRender');
    this.rendered = true;

    if ((this.records || []).length === 0) return;
    this.chartComponent.update(this.chart, this.records);
  }
}
