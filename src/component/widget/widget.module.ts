import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartWrapperModule } from '../chart-wrapper/chart-wrapper.module';
import { GridWrapperModule } from '../grid-wrapper/grid-wrapper.module';
import { WidgetComponent } from './widget.component';
import { QueryService } from '../../service/query.service';
import { AnalysisModule } from '../analysis/analysis.module';
import { AnalysisService } from '../analysis/analysis.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [WidgetComponent],
  imports: [CommonModule, GridWrapperModule, ChartWrapperModule, AnalysisModule, MatButtonModule, MatIconModule],
  exports: [WidgetComponent],
  providers: [QueryService, AnalysisService],
})
export class WidgetModule {}
