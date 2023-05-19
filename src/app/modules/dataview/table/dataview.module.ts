import { DataViewRoutes } from './dataview.routes';
import { FormsModule } from '@angular/forms';
import { DataViewComponent } from './dataview.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollerModule } from 'primeng/scroller';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [DataViewComponent],
  imports: [
    RouterModule.forChild(DataViewRoutes),
    CommonModule,
    AccordionModule,
    TableModule,
    CalendarModule,
    CheckboxModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    FormsModule,
    DropdownModule,
    TooltipModule,
    ButtonModule,
    ToastModule,
    ScrollerModule,
    InputTextModule,
    TriStateCheckboxModule,
    ProgressBarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataViewModule {}
