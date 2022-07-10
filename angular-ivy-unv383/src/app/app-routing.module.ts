import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormDetailsComponent } from './form-details/form-details.component';
import { TableDemoComponent } from './table-demo/table-demo.component';

const routes: Routes = [
  { path: 'table-demo', component: TableDemoComponent },
  { path: 'form-details', component: FormDetailsComponent },
  { path: '**', redirectTo: '/form-details' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
