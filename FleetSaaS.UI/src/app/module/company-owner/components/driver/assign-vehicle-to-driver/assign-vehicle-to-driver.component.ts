import { Component, inject, OnInit, signal } from '@angular/core';
import { DropdownOption } from '../../../../../shared/modules/form-control/interface/select.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { VehicleService } from '../../../../services/vehicle.service';
import { ErrorResponse, SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { MatDialogRef } from '@angular/material/dialog';
import { Driver, VehicleAssignmentRequest } from '../../../interfaces/driver.interface';
import { CommonModule } from '@angular/common';
import { assignLabel, reAssignLabel } from '../../../../../shared/utils/constant.static';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-assign-vehicle-to-driver',
  imports: [MaterialModule, CommonModule, SharedModule],
  templateUrl: './assign-vehicle-to-driver.component.html',
  styleUrl: './assign-vehicle-to-driver.component.scss',
})

export class AssignVehicleToDriverComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly vehicleService = inject(VehicleService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<Driver>);

  assignForm !: FormGroup;

  vehicleList = signal<DropdownOption[]>([]);
  driverData = signal<Driver | null>(null);
  btnLabel = signal('Assign');

  constructor() {
    this.assignForm = this.formBuilder.group({
      id: [null],
      vehicleId: [null,[Validators.required]],
      driverId: [null],
    })
  }

  ngOnInit(): void {
    this.getVehiclesList();
    this.driverData.set(this.dialogRef.componentInstance.data.data);
    this.btnLabel.set((this.driverData()?.isVehicleAssigned) ? reAssignLabel : assignLabel);
  }

  get vehicleControl() {
    return this.assignForm.get('vehicleId') as FormControl;
  }

  getVehiclesList() {
    this.vehicleService.getVehicleList().subscribe({
      next: (response: SuccessResponse<DropdownOption[]>) => {
        this.vehicleList.set(response.data ?? []);
      },
      error: (error: ErrorResponse) => {
        this.snackBarService.error(error.messages[0]);
        this.vehicleList.set([]);
      }
    });
  }

  assignVehicle(id: string | undefined) {
    var vehicleAssignmentRequest: VehicleAssignmentRequest = {
      driverId: this.driverData()?.id ?? '',
      vehicleId: this.assignForm.value.vehicleId,
      id: this.assignForm.value.id 
    }
    if (id != null) 
    {
      vehicleAssignmentRequest.id = this.driverData()?.vehicleAssignmentId;
      this.vehicleService.reAssignVehicleToDriver(vehicleAssignmentRequest).subscribe({
        next: (response: SuccessResponse<string>) => {
          this.snackBarService.success(response.messages[0]);
          this.dialogRef.close(true);
        },
        error: (error: ErrorResponse) => {
          this.snackBarService.error(error.messages[0]);
        }
      });
    }
    else 
    {
      this.vehicleService.assignVehicleToDriver(vehicleAssignmentRequest).subscribe({
        next: (response: SuccessResponse<string>) => {
          this.snackBarService.success(response.messages[0]);
          this.dialogRef.close(true);
        },
        error: (error: ErrorResponse) => {
          this.snackBarService.error(error.messages[0]);
        }
      });
    }
  }

  unAssignVehicle(){
     this.vehicleService.unAssignVehicleToDriver(this.driverData()?.vehicleAssignmentId ?? '').subscribe({
        next: (response: SuccessResponse<string>) => {
          this.snackBarService.success(response.messages[0]);
          this.dialogRef.close(true);
        },
        error: (error: ErrorResponse) => {
          this.snackBarService.error(error.messages[0]);
        }
      });
  }

  cancel(){
    this.dialogRef.close(false);
  }
}
