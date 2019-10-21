import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QueryService } from 'src/service/query.service';

import { GridWrapperModule } from '../grid-wrapper/grid-wrapper.module';
import { WidgetManagerComponent } from './widget-manager.component';

@NgModule({
  declarations: [WidgetManagerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    GridWrapperModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonToggleModule,
  ],
  exports: [WidgetManagerComponent],
  entryComponents: [WidgetManagerComponent],
  providers: [QueryService],
})
export class WidgetManagerModule {}
