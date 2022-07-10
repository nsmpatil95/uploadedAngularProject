import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TableDataService {
  dataArr: any[] = [
    {
      id: 0,
      firstName: 'Abc',
      lastName: 'pqr',
      mobNum: '1212121212',
      city: 'Mumbai',
      email: 'abc@gmail.com',
    },
  ];
  index = 1;
  tableData: BehaviorSubject<any> = new BehaviorSubject<any>(this.dataArr);
  tableDataObservable = this.tableData.asObservable();
  constructor() {}
  addRow(obj) {
    obj.id = this.index++;
    this.dataArr.push(obj);
    this.tableData.next(this.dataArr);
  }

  getDetails() {
    console.log(this.dataArr);
    return this.dataArr;
  }
  deletRow(obj) {
    let objIndex = this.dataArr.findIndex((row) => row.id == obj.id);
    this.dataArr.splice(objIndex, 1);
    this.tableData.next(this.dataArr);
    console.log('finaaaaaaaaal', this.dataArr);
  }
}
