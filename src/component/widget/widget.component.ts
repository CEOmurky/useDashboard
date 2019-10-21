import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartTypes, Field, formatDateTime, getChartConfigs, TwoLevelPieConfigs, PieChartConfigs } from 'eediom-sdk';

import { FieldTypes, QueryService } from '../../service/query.service';
import { AnalysisService, Filter } from '../analysis/analysis.service';
import { Widget, WidgetTypes } from './widget';

@Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
})
export class WidgetComponent implements OnInit, OnDestroy {
  @Input() widget: Widget;

  records: any[];
  totalCount: number;
  chart: Chart;

  showEdit: boolean = false;

  private filter: Filter;
  private isRun: boolean = false;
  private interval: any;
  constructor(private queryService: QueryService, private analysisService: AnalysisService) {}

  ngOnInit(): void {
    if (this.widget.type === WidgetTypes.Filter) return;

    this.filter = this.analysisService.filter;
    this.analysisService.filter$.subscribe((filter: Filter) => {
      this.filter = filter;
      this.initWidget();
    });

    this.initWidget();

    setInterval(() => {
      this.initWidget();
    }, this.widget.tick * 1000);
  }

  ngOnDestroy(): void {
    window.clearInterval(this.interval);
  }

  get query(): string {
    const query = this.widget.query;
    const { from, to } = this.filter;
    const sliced = query.match(/(\b(?!split\b)[^ $]+\b)/g);
    if (sliced.length <= 1) return query;

    return `set from="${formatDateTime(from)}" | set to="${formatDateTime(to)}" | ${sliced[0]} from=$("from") to=$("to") ${
      sliced[1]
    }`;
  }

  async initWidget(): Promise<void> {
    const { type, chartPreset } = this.widget;
    console.log('TCL: chartPreset', chartPreset);
    if (this.isRun) return;
    this.isRun = true;
    this.queryService.query(this.query, 100, 0).then((res) => {
      console.log('TCL: this.query', this.query);
      this.records = res.records;
      this.totalCount = res.count;

      this.isRun = false;
    });

    if (type === WidgetTypes.Grid) return;

    const chartConfigs = getChartConfigs(chartPreset.type);
    (<any>chartConfigs).isAutoSeries = false;
    if (chartPreset.type === ChartTypes.Pie) {
      (<PieChartConfigs>chartConfigs).xField = new Field(chartPreset.x.key, chartPreset.x.value);
      (<PieChartConfigs>chartConfigs).yField = new Field((<any>chartPreset.y)[0].key, (<any>chartPreset.y)[0].value);
    } else if (chartPreset.type === ChartTypes.TwoLevelPie) {
      (<TwoLevelPieConfigs>chartConfigs).xField = new Field((<any>chartPreset.y)[0].key, (<any>chartPreset.y)[0].value);
      (<TwoLevelPieConfigs>chartConfigs).yField = new Field((<any>chartPreset.y)[1].key, (<any>chartPreset.y)[1].value);
      (<TwoLevelPieConfigs>chartConfigs).size = new Field((<any>chartPreset.y)[2].key, (<any>chartPreset.y)[2].value);
      (<TwoLevelPieConfigs>chartConfigs).sizeLabel = 'ratio';
    } else {
      (<any>chartConfigs).xField = new Field(chartPreset.x.key, chartPreset.x.value);
      (<any>chartConfigs).yFields = (<any>chartPreset.y).map((yField: FieldTypes) => new Field(yField.key, yField.value));
    }

    this.chart = new Chart(chartPreset.type, chartConfigs);
    console.log('TCL: WidgetComponent -> constructor -> this.chart', this.chart);
  }

  onHover(): void {
    console.log('TCL: void');
    this.showEdit = true;
  }

  onBlur(): void {
    this.showEdit = false;
  }
}
