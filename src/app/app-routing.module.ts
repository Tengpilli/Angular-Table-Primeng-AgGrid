import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/primeng',
    pathMatch: 'full',
  },
  {
    path: 'primeng',
    loadChildren: () =>
      import('./modules/dataview/table/dataview.module').then(
        (m) => m.DataViewModule
      ),
  },
  {
    path: 'aggrid',
    loadChildren: () =>
      import('./modules/ag-grid/ag-grid.module').then(
        (m) => m.AgGridViewModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
