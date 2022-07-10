import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MatButtonModule } from '@angular/material/button';
import { TableDataService } from './table-data.service';
import { MatTableModule } from '@angular/material/table';
import { TableDemoComponent } from './table-demo/table-demo.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatSliderModule,
    MatInputModule,
    MatSortModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatAutocompleteModule,
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    TableDemoComponent,
    FormDetailsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    TableDataService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
