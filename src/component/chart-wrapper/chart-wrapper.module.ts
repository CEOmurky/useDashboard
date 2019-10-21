import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'eediom-sdk';

import { ChartWrapperComponent } from './chart-wrapper.component';

@NgModule({
  declarations: [ChartWrapperComponent],
  imports: [CommonModule, ChartModule],
  exports: [ChartWrapperComponent],
})
export class ChartWrapperModule {}
