import { Component, OnInit, inject, input, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MaterialModule } from "../../../../shared/material/material.module";
import { ButtonColor, ButtonType } from "../../../../shared/modules/form-control/common-type/buttontype";
import { ButtonComponent } from "../../../../shared/modules/form-control/components/button/button.component";
import { DynamicTableComponent } from "../../../../shared/modules/form-control/components/dynamic-table/dynamic-table.component";
import { DialogService } from "../../../../shared/services/dialog.service";
import { primaryColor } from "../../../../shared/utils/constant.static";
import { DriverTableColumns } from "../../configs/driver.config";
import { AddEditDriverComponent } from "./add-edit-driver/add-edit-driver.component";
import { DriverService } from "../../../services/driver.service";
import { SuccessResponse } from "../../../../interfaces/common.interface";
import { Driver, DriverResponse } from "../../interfaces/driver.interface";
import { SnackbarService } from "../../../../shared/services/snackbar-service";
import { DeleteDriverComponent } from "./delete-driver/delete-driver.component";
import { PagedRequest } from "../../../../shared/modules/form-control/interface/pagination.interface";

@Component({
  selector: 'app-driver',
  imports: [MaterialModule, ReactiveFormsModule, ButtonComponent, DynamicTableComponent],
  templateUrl: './driver.component.html',
  styleUrl: './driver.component.scss',
})

export class DriverComponent implements OnInit {
  private readonly driverService = inject(DriverService);
  private readonly dialogService = inject(DialogService);
  private readonly snackBarService = inject(SnackbarService);

  drivers = signal<Driver[]>([]);
  columns = DriverTableColumns;
  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

  ngOnInit(): void {
    this.getAllDrivers();
  }

  getAllDrivers() {
    var pagedRequest: PagedRequest = {
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize(),
    };
      this.driverService.getAllDrivers(pagedRequest).subscribe({
      next: (response: SuccessResponse<DriverResponse>) => {
        this.snackBarService.success(response.messages[0]);
        response.data.driversList = response.data.driversList.map(data => ({
        ...data,
        isAct: data.isActive ? 'Yes' : 'No',
        isAvail: data.isAvailable ? 'Yes' : 'No'
      }));
        this.drivers.set(response.data.driversList ?? []);
      },
      error: (error) => {
        this.snackBarService.error(error.messages[0]);
        this.drivers.set([]);
      }
    });
  }

  addEditDriver(value: any) {
    var label;
    if (value.id == null) {
      label = 'Add';
    }
    else {
      label = 'Edit'
    }
    this.dialogService.open(label + ' Driver', AddEditDriverComponent, value, true).subscribe(
      (data => {
        if (data) {
          debugger
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
    // console.log(event);
  }
}
