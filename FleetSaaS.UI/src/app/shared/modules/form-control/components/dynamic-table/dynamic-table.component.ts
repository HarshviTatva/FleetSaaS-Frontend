import { CommonModule } from '@angular/common';
import { Component, computed, effect, input, output, viewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { pageSizeOptions } from '../../../../utils/constant.static';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';
import { TableColumn } from '../../interface/table.inteface';

@Component({
  selector: 'app-dynamic-table',
  standalone:true,
  imports: [
    ...MATERIAL_IMPORTS,
    CommonModule],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',

})
export class DynamicTableComponent<T>{

  data = input<T[] | null>(null);
  length = input<number>();
  columns = input.required<TableColumn<T>[]>();
  pageSizeOptions = input<number[]>(pageSizeOptions);
  pageSize = input<number>();

  edit = output<T>();
  delete = output<T>();
  assignVehicle = output<T>();
  cancel = output<T>();
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
      this.dataSource.data = this.data() ?? [];
    });   
  
  }

  onSortChange(sort: Sort) {
    this.sortChange.emit(sort);
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);    
  }

  getStatusClass(status: string): string {
  return {
    'Planned': 'status-planned',
    'In Progress': 'status-inprogress',
    'Completed': 'status-completed',
    'Cancelled': 'status-cancelled',
    'Started': 'status-started',
    'Assigned': 'status-assigned'
  }[status] || '';
}

}
