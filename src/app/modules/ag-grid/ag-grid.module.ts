import { MaterialModule } from 'src/app/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AgGridViewComponent } from './ag-grid.component';
import { AgGridViewRoutes } from './ag-grid.routes';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [AgGridViewComponent],
  imports: [
    RouterModule.forChild(AgGridViewRoutes),
    CommonModule,
    FormsModule,
    AgGridModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  bootstrap: [AgGridViewComponent],
})
export class AgGridViewModule {}
