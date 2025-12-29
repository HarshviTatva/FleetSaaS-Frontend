import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { ButtonComponent } from '../../../../shared/modules/form-control/components/button/button.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { Vehicle, VehicleResponse } from '../../interface/vehicle.interface';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { addLabel, editLabel, primaryColor } from '../../../../shared/utils/constant.static';
import { VehicleTableColumns } from '../../config/vehicle.config';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { VehicleService } from '../../../services/vehicle.service';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { AddEditVehicleComponent } from './add-edit-vehicle/add-edit-vehicle.component';
import { DeleteVehicleComponent } from './delete-vehicle/delete-vehicle.component';
import { DynamicTableComponent } from '../../../../shared/modules/form-control/components/dynamic-table/dynamic-table.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  imports: [MaterialModule,ButtonComponent,DynamicTableComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
})

export class VehicleComponent implements OnInit{

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

  ngOnInit(): void {
    this.getAllVehicles();
  }

  getAllVehicles(){
  var pagedRequest: PagedRequest = {
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize(),
    };
      this.vehicleService.getAllVehicles(pagedRequest).subscribe({
      next: (response: SuccessResponse<VehicleResponse>) => {
        response.data.vehicles = response.data.vehicles.map(data => ({
        ...data,
        isAct: data.isActive ? 'Yes' : 'No',
        insuranceExpiryDateString:this.datePipe.transform(data.insuranceExpiryDate,'dd-MMM-yyyy') ?? '--'
      }));
        this.vehicles.set(response.data.vehicles ?? []);
      },
      error: (error) => {
        this.snackBarService.error(error.messages[0]);
        this.vehicles.set([]);
      }
    });
  }

    addEditVehicle(value: any) {
      this.dialogService.open((value==0?addLabel:editLabel) + ' Vehicle', AddEditVehicleComponent, value, true).subscribe(
        ((data:boolean) => {
          if (data) {
            this.getAllVehicles();
          }
        })
      );
  
    }
  
    onDelete(vehicle: any) {
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
  
    onPage(event: any) {
      this.pageNumber.set(event.pageIndex + 1);
      this.pageSize.set(event.pageSize);
      this.getAllVehicles();
    }
  
    onSort(event: any) {
      // console.log(event);
    }

}
