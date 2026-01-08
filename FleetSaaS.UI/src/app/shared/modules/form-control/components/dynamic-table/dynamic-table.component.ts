import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, input, output, viewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { pageSizeOptions } from '../../../../utils/constant.static';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';
import { TableColumn } from '../../interface/table.inteface';
import { NoDataFoundComponent } from '../../../../components/no-data-found/no-data-found.component';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    CommonModule,
    NoDataFoundComponent
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',

})
export class DynamicTableComponent<T> {

  private readonly tokenService = inject(TokenService);

  data = input<T[] | null>(null);
  length = input<number>();
  columns = input.required<TableColumn<T>[]>();
  pageSizeOptions = input<number[]>(pageSizeOptions);
  pageSize = input<number>();
  currentRole = this.tokenService.getUserRoleFromToken()!;
  edit = output<T>();
  delete = output<T>();
  assignVehicle = output<T>();
  cancel = output<T>();
  download = output<T>();
  statusChange = output<T>();
  pageChange = output<PageEvent>();
  sortChange = output<Sort>();
  paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  dataSource = new MatTableDataSource<T>([]);

  visibleColumns = computed(() =>
    this.columns().filter(col =>
      !col.roles || col.roles.includes(this.currentRole)
    )
  );

  displayedColumns = computed(() =>
    this.visibleColumns().map(c => c.key)
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
      'Assigned': 'status-assigned',
      'Accepted': 'status-accepted'
    }[status] || '';
  }

}
