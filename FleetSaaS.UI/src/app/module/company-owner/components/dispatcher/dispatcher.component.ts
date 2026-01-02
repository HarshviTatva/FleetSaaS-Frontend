import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { DialogService } from '../../../../shared/services/dialog.service';
import { addLabel, editLabel, pageSizeOptions, primaryColor } from '../../../../shared/utils/constant.static';
import { DispactherTableColumns } from '../../configs/driver.config';
import { Dispatcher, DispatcherResponse } from '../../interfaces/dispatcher.interface';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { DispatcherService } from '../../../services/dispatcher.service';
import { AddEditDispatcherComponent } from './add-edit-dispatcher/add-edit-dispatcher.component';
import { DeleteDispatcherComponent } from './delete-dispatcher/delete-dispatcher.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dispatcher',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule, SharedModule],
  templateUrl: './dispatcher.component.html',
  styleUrl: './dispatcher.component.scss',
})

export class DispatcherComponent implements OnInit {
  private readonly dialogService = inject(DialogService);
  private readonly dispatcherService = inject(DispatcherService);
  dispatchers = signal<Dispatcher[]>([]);
  columns = DispactherTableColumns;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  pageSizeOptions = pageSizeOptions;
  searchControl = new FormControl('');
  sortBy = signal<string>('userName');
  sortDirection = signal<'asc' | 'desc'>('desc');

   searchConfig: InputConfig = {
    key: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Enter Search'
  }

  ngOnInit(): void {
    this.getAllDispatchers();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(0);
        this.getAllDispatchers();
      });
  }

  getAllDispatchers() {
    const pagedRequest: PagedRequest = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.searchControl.value?.trim() || '',
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()
    };
    this.dispatcherService.getAllDispatchers(pagedRequest).subscribe({
      next: (response: SuccessResponse<DispatcherResponse>) => {
        this.totalCount.set(response.data.totalCount);
        response.data.dispatcherList = response.data.dispatcherList.map(data => ({
          ...data,
          isAct: data.isActive ? 'Yes' : 'No'
        }));
        this.dispatchers.set(response.data.dispatcherList ?? []);
      },
      error: () => {
        this.dispatchers.set([]);
      }
    });
  }

  addEditDispatcher(value: Dispatcher|number) {
    this.dialogService.open((value == 0 ? addLabel : editLabel) + ' Dispatcher', AddEditDispatcherComponent, value, true).subscribe(
      ((data: boolean) => {
        if (data) {
          this.getAllDispatchers();
        }
      })
    );
  }


  onDelete(dispatcher: Dispatcher) {
    this.dialogService.open('Delete Driver', DeleteDispatcherComponent, dispatcher, false).subscribe((result) => {
      if (result === true) {
        this.getAllDispatchers();
      }
    });
  }

  onPage(event: PageEvent) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllDispatchers();
  }

  onSort(event: Sort) {
    this.sortBy.set(event.active);
    this.sortDirection.set(event.direction || 'asc');
    this.getAllDispatchers();
  }

}
