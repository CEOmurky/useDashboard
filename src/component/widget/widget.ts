import { ChartTypes } from 'eediom-sdk';
import { FieldTypes } from 'src/service/query.service';

/**
 * @param
 * query: 원본 쿼리
 * tick: 새로고침 주기
 */
export class Widget {
  query: string;
  title: string;
  type: WidgetTypesID;
  tick: number;
  chartPreset?: ChartPreset;

  constructor(options?: { query?: string; title?: string; type?: WidgetTypesID; tick?: number; chartPreset?: ChartPreset }) {
    this.query = options.query;
    this.title = options.title;
    this.type = options.type;
    this.tick = options.tick;
    this.chartPreset = options.chartPreset;
  }
}

// export enum WidgetTypes {
//   Chart = 'chart',
//   Grid = 'grid',
//   Filter = 'filter',
// }

export interface ChartPreset {
  type: ChartTypes;
  x: FieldTypes;
  y: FieldTypes | FieldTypes[];
}

const INCREASE = 'counter/INCREASE' as const;
export const increase = () => ({ type: INCREASE });

type CounterAction = ReturnType<typeof increase>;

export const WidgetTypes = {
  Chart: 'Chart',
  Grid: 'Grid',
  Filter: 'Filter',
} as const;

export type WidgetTypesID = keyof typeof WidgetTypes;

export const WidgetIDs = Object.keys(WidgetTypes) as WidgetTypesID[];
