import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { DialogService } from '../../../../shared/services/dialog.service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { addLabel, editLabel, pageSizeOptions, primaryColor } from '../../../../shared/utils/constant.static';
import { VehicleService } from '../../../services/vehicle.service';
import { VehicleTableColumns } from '../../config/vehicle.config';
import { Vehicle, VehicleResponse } from '../../interface/vehicle.interface';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';

@Component({
  selector: 'app-vehicle',
  imports: [...MATERIAL_IMPORTS,SharedModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})

export class VehicleComponent implements OnInit {
  
  private readonly dialogService = inject(DialogService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly vehicleService = inject(VehicleService);
  private readonly datePipe = inject(DatePipe);

  vehicles = signal<Vehicle[]>([]);
  columns = VehicleTableColumns;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  pageSizeOptions = pageSizeOptions;
  searchControl = new FormControl('');
  sortBy = signal<string>('make');
  sortDirection = signal<'asc' | 'desc'|''>('desc');

  searchConfig: InputConfig = {
    key: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Enter Search'
  }

  ngOnInit(): void {
    this.getAllVehicles();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(1);
        this.getAllVehicles();
      });
  }

  getAllVehicles() {
    const pagedRequest: PagedRequest = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.searchControl.value?.trim() || '',
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()|| 'asc'
    };
    this.vehicleService.getAllVehicles(pagedRequest).subscribe({
      next: (response: SuccessResponse<VehicleResponse>) => {
        this.totalCount.set(response.data.totalCount);
        response.data.vehicles = response.data.vehicles.map(data => ({
          ...data,
          isAct: data.isActive ? 'Yes' : 'No',
          insuranceExpiryDateString: this.datePipe.transform(data.insuranceExpiryDate, 'dd-MMM-yyyy') ?? '--'
        }));
        this.vehicles.set(response.data.vehicles ?? []);
      },
      error: (error) => {
        this.snackBarService.error(error.messages[0]);
        this.vehicles.set([]);
      }
    });
  }

  addEditVehicle(value: Vehicle|number) {
    this.dialogService.open((value == 0 ? addLabel : editLabel) + ' Vehicle', AddEditVehicleComponent, value, true).subscribe(
      ((data: boolean) => {
        if (data) {
          this.getAllVehicles();
        }
      })
    );

  }

  onDelete(vehicle: Vehicle) {
    this.dialogService
      .open(
        'Delete Vehicle',
        DeleteVehicleComponent,
        vehicle,
        false
      )
      .subscribe((result) => {
        if (result === true) {
          this.getAllVehicles();
        }
      });
  }

  onPage(event: PageEvent) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllVehicles();
  }

  onSort(event: Sort) {
    this.sortBy.set(event.active);
    this.sortDirection.set(event.direction || 'asc');
    this.getAllVehicles();
  }

}
