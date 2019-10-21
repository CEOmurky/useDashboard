import { Component, OnInit } from '@angular/core';
import { AnalysisService, Filter } from './analysis.service';

@Component({
  selector: 'analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
})
export class AnalysisComponent implements OnInit {
  from: Date = new Date();
  to: Date = new Date();

  set filter(filter: Filter) {
    const { from, to } = filter;
    this.from = from;
    this.to = to;
  }

  constructor(private analysisService: AnalysisService) {
    this.filter = this.analysisService.filter;
    this.analysisService.filter$.subscribe((filter) => {
      console.log('TCL: AnalysisComponent -> constructor -> filter', filter);
    });
  }

  onAnalysis(): void {
    this.analysisService.filter$.next({
      from: this.from,
      to: this.to,
    });
  }

  ngOnInit() {}
}
