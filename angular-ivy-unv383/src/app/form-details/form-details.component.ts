import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.css'],
})
export class FormDetailsComponent implements OnInit {
  filterForm: FormGroup;
  cityArray: any[] = [
    { value: 'Delhi', viewValue: 'Delhi' },
    { value: 'Mumbai', viewValue: 'Mumbai' },
    { value: 'Pune', viewValue: 'Pune' },
    { value: 'Chennai', viewValue: 'Chennai' },
    { value: 'Banglore', viewValue: 'Banglore' },
  ];

  tableData: any;

  constructor(
    private tableDataService: TableDataService,
    private router: Router
  ) {}
  ngOnInit() {
    this.filterForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z]+[a-zA-Z]*$'),
      ]),
      lastName: new FormControl('', [Validators.pattern('^[A-Z]+[a-zA-Z]*$')]),
      mobNum: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      city: new FormControl('', [Validators.required]),
    });

    console.log(this.filterForm.value);

    this.tableDataService.tableDataObservable.subscribe((data) => {
      this.tableData = data;
    });
  }

  checkUniqueEmail() {
    let indexOf = this.tableData.findIndex(
      (row) => row.email == this.filterForm.controls.email.value
    );
    if (indexOf > -1) {
      this.filterForm.controls.email.setErrors({ emaidIdExist: true });
    }
  }

  checkUniqueMobileNum() {
    let indexOf = this.tableData.findIndex(
      (row) => row.mobNum == this.filterForm.controls.mobNum.value
    );
    if (indexOf > -1) {
      this.filterForm.controls.mobNum.setErrors({ mobNumExist: true });
    }
  }

  addRow() {
    this.tableDataService.addRow(this.filterForm.value);
    this.router.navigate(['/table-demo']);
  }
  private InvalidMobNum(control: AbstractControl): { [s: string]: boolean } {
    if (control.value && control.value.size != 10) {
      console.log(control.value.size, 'control.value.length');
      return { invalidMobNum: true };
    }
    return null;
  }

  private UniqueEmailId(control: AbstractControl): { [s: string]: boolean } {
    if (control.value) {
      this.tableDataService.tableDataObservable.subscribe((data) => {
        let indexOf = data.findIndex((row) => row.email == control.value);

        console.log(indexOf);
        if (indexOf >= 1) {
          return { uniqueEmailId: true };
        }
      });
    }
    return null;
  }
}
