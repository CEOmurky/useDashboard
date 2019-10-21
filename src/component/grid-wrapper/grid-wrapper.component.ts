import { Component, OnInit, Input } from '@angular/core';
import { GridData } from 'eediom-sdk';

@Component({
  selector: 'grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.less'],
})
export class GridWrapperComponent implements OnInit {
  @Input() count: number;
  @Input() showPager: boolean = false;
  @Input() set records(records: any[]) {
    if (!records) {
      return;
    }

    this.gridData = new GridData({
      records,
    });
  }

  gridData: GridData;
  constructor() {}

  ngOnInit() {}
}
