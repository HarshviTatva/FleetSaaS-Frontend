import { AfterViewInit, Component, computed, effect, input, output, viewChild, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../interface/table.inteface';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSizeOptions } from '../../../../utils/constant.static';

@Component({
  selector: 'app-dynamic-table',
  imports: [MaterialModule,CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent<T> implements AfterViewInit{

  data = input.required<T[]>();
  columns = input.required<TableColumn<T>[]>();
  pageSizeOptions = input<number[]>(pageSizeOptions);
  pageSize = input<number>(10);

  edit = output<T>();
  delete = output<T>();
  pageChange = output<PageEvent>();
  sortChange = output<Sort>();

  paginator  = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  dataSource = new MatTableDataSource<T>([]);

  displayedColumns = computed(() =>
    this.columns().map(c => c.key)
  );

  constructor() {
    effect(() => {
      this.dataSource.data = this.data();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
