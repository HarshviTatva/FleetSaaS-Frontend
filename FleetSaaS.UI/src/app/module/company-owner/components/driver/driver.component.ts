import { Component, OnInit, inject, input, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../../../shared/material/material.module";
import { ButtonColor, ButtonType } from "../../../../shared/modules/form-control/common-type/buttontype";
import { DialogService } from "../../../../shared/services/dialog.service";
import { addLabel, assignLabel, editLabel, primaryColor, reAssignLabel } from "../../../../shared/utils/constant.static";
import { DriverTableColumns } from "../../configs/driver.config";
import { AddEditDriverComponent } from "./add-edit-driver/add-edit-driver.component";
import { DriverService } from "../../../services/driver.service";
import { SuccessResponse } from "../../../../shared/interfaces/common.interface";
import { Driver, DriverResponse } from "../../interfaces/driver.interface";
import { DeleteDriverComponent } from "./delete-driver/delete-driver.component";
import { PagedRequest } from "../../../../shared/modules/form-control/interface/pagination.interface";
import { DatePipe } from '@angular/common';
import { AssignVehicleToDriverComponent } from "./assign-vehicle-to-driver/assign-vehicle-to-driver.component";
import { InputConfig } from "../../../../shared/modules/form-control/components/input/input.component";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { SharedModule } from "../../../../shared/modules/shared.module";
import { MATERIAL_IMPORTS } from "../../../../shared/utils/material.static";
@Component({
  selector: 'app-driver',
  imports: [...MATERIAL_IMPORTS, ReactiveFormsModule, SharedModule],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss',
  standalone:true
})

export class DriverComponent implements OnInit {
  private readonly driverService = inject(DriverService);
  private readonly dialogService = inject(DialogService);
  private readonly datePipe = inject(DatePipe);

  drivers = signal<Driver[]>([]);
  columns = DriverTableColumns;
  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

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
    this.getAllDrivers();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(0);
        this.getAllDrivers();
      });
  }

  getAllDrivers() {
    const pagedRequest: PagedRequest = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.searchControl.value?.trim() || '',
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()
    };
    this.driverService.getAllDrivers(pagedRequest).subscribe({
      next: (response: SuccessResponse<DriverResponse>) => {
        response.data.driversList = response.data.driversList.map(data => ({
          ...data,
          isAct: data.isActive ? 'Yes' : 'No',
          isAvail: data.isAvailable ? 'Yes' : 'No',
          licenseExpiryDateString: this.datePipe.transform(data.licenseExpiryDate, 'dd-MMM-yyyy') ?? '-'
        }));
        this.drivers.set(response.data.driversList ?? []);
      },
      error: () => {
        this.drivers.set([]);
      }
    });
  }

  addEditDriver(value: any) {
    this.dialogService.open((value == 0 ? addLabel : editLabel) + ' Driver', AddEditDriverComponent, value, true).subscribe(
      (data => {
        if (data) {
          this.getAllDrivers();
        }
      })
    );

  }

  onDelete(driver: any) {
    this.dialogService
      .open(
        'Delete Driver',
        DeleteDriverComponent,
        driver,
        false
      )
      .subscribe((result) => {
        if (result === true) {
          this.getAllDrivers();
        }
      });
  }

  onPage(event: any) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllDrivers();
  }

  onSort(event: any) {
    this.sortBy.set(event.sortBy);
    this.sortDirection.set(event.direction);
    this.getAllDrivers();
  }

  onAssignVehicle(driver: Driver) {
    this.dialogService
      .open(
        ((driver.isVehicleAssigned) ? reAssignLabel : assignLabel) +
        ' Vehicle',
        AssignVehicleToDriverComponent,
        driver,
        false
      )
      .subscribe((result) => {
        if (result === true) {
          this.getAllDrivers();
        }
      });
  }
}
