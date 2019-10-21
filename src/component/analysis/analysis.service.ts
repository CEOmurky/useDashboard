import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  filter$: Subject<Filter> = new Subject<Filter>();

  get filter(): Filter {
    return this._filter;
  }

  set filter(filter: Filter) {
    this.filter$.next(filter);
  }

  //   initialFilter
  private _filter: Filter = {
    from: new Date(),
    to: new Date(),
  };

  constructor() {
    this.filter$.subscribe((filter) => (this._filter = filter));
  }
}

export interface Filter {
  from: Date;
  to: Date;
}
