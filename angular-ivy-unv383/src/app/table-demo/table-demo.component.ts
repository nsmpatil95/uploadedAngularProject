import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-table-demo',
  templateUrl: './table-demo.component.html',
  styleUrls: ['./table-demo.component.css'],
})
export class TableDemoComponent implements OnInit, AfterViewInit {
  columnArr: string[] = [
    'select',
    'firstName',
    'lastName',
    'email',
    'mobNum',
    'city',
  ];
  dataSource: any;
  selection = new SelectionModel<any>(true, []);
  data: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('tableSort') tableSort = new MatSort();

  constructor(
    private tableDataService: TableDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableDataService.tableDataObservable.subscribe((data) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(data);
    });
  }
  back() {
    this.router.navigate(['/form-details']);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
  selectedRow(row, event) {
    event.stopPropagation();
    console.log(row, event);
    this.tableDataService.deletRow(row);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.tableSort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
