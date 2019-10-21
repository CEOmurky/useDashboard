import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';

import { DatetimePickerModule, ServiceModule } from 'eediom-sdk';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AnalysisService } from './analysis.service';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    CommonModule,
    DatetimePickerModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ServiceModule.forRoot({
      productName: 'BOOTCAMP',
    }),
  ],
  exports: [AnalysisComponent],
  providers: [AnalysisService],
})
export class AnalysisModule {}
