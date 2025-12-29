import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../shared/modules/form-control/components/button/button.component';
import { DynamicTableComponent } from '../../../../shared/modules/form-control/components/dynamic-table/dynamic-table.component';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { DialogService } from '../../../../shared/services/dialog.service';
import { addLabel, editLabel, primaryColor } from '../../../../shared/utils/constant.static';
import { DispactherTableColumns } from '../../configs/driver.config';
import { AddEditDriverComponent } from '../driver/add-edit-driver/add-edit-driver.component';
import { Dispatcher, DispatcherResponse } from '../../interfaces/dispatcher.interface';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { DispatcherService } from '../../../services/dispatcher.service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { AddEditDispatcherComponent } from './add-edit-dispatcher/add-edit-dispatcher.component';
import { DeleteDispatcherComponent } from './delete-dispatcher/delete-dispatcher.component';

@Component({
  selector: 'app-dispatcher',
  imports: [MaterialModule, ReactiveFormsModule,ButtonComponent,DynamicTableComponent],
  templateUrl: './dispatcher.component.html',
  styleUrl: './dispatcher.component.scss',
})

export class DispatcherComponent {
  private readonly dialogService = inject(DialogService);
  private readonly dispatcherService = inject(DispatcherService);
   private readonly snackbarService = inject(SnackbarService);
  dispatchers = signal<Dispatcher[]>([]);
  columns = DispactherTableColumns;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

  ngOnInit(): void {
    this.getAllDispatchers();
  }

  getAllDispatchers(){
  var pagedRequest: PagedRequest = {
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize(),
    };
      this.dispatcherService.getAllDispatchers(pagedRequest).subscribe({
      next: (response: SuccessResponse<DispatcherResponse>) => {
        response.data.dispatcherList = response.data.dispatcherList.map(data => ({
        ...data,
        isAct: data.isActive ? 'Yes' : 'No'
      }));
        this.dispatchers.set(response.data.dispatcherList ?? []);
      },
      error: (error) => {
        this.snackbarService.error(error.messages[0]);
        this.dispatchers.set([]);
      }
    });
  }

  addEditDispatcher(value: any) {
     this.dialogService.open((value==0?addLabel:editLabel)  + ' Dispatcher', AddEditDispatcherComponent, value, true).subscribe(
      ((data:boolean) => {
        if (data) {
          this.getAllDispatchers();
        }
      })
    );
  }


  onDelete(dispatcher: any) {
  this.dialogService.open('Delete Driver', DeleteDispatcherComponent, dispatcher, false).subscribe((result) => {
       if (result === true) {
         this.getAllDispatchers();
       }
   });
  }

  onPage(event: any) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllDispatchers();
  }

  onSort(event: any) {

  }
}
