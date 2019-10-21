import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridWrapperComponent } from './grid-wrapper.component';
import { GridModule } from 'eediom-sdk';

@NgModule({
  declarations: [GridWrapperComponent],
  imports: [CommonModule, GridModule],
  exports: [GridWrapperComponent],
})
export class GridWrapperModule {}
