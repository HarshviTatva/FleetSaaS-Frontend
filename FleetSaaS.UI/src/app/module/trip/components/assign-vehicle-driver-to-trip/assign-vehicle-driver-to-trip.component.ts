import { Component, inject, signal } from '@angular/core';
import { TripService } from '../../../services/trip.service';
import { Trip, TripAssignmentRequest } from '../../interface/trip.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { DropdownOption } from '../../../../shared/modules/form-control/interface/select.interface';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { reAssignLabel, assignLabel } from '../../../../shared/utils/constant.static';
import { Driver, VehicleAssignmentRequest } from '../../../company-owner/interfaces/driver.interface';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-assign-vehicle-driver-to-trip',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './assign-vehicle-driver-to-trip.component.html',
  styleUrl: './assign-vehicle-driver-to-trip.component.scss',
})
export class AssignVehicleDriverToTripComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly tripService = inject(TripService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly commonService = inject(CommonService);
  private readonly dialogRef = inject(MatDialogRef<Trip>);

  assignForm !: FormGroup;

  driverList = signal<DropdownOption[]>([]);
  tripData = signal<Trip | null>(null);
  btnLabel = signal('Assign');

  constructor() {
    this.assignForm = this.formBuilder.group({
      id: [null],
      vehicleAssignmentId: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getDriverVehicleList();
    this.tripData.set(this.dialogRef.componentInstance.data.data);
    this.btnLabel.set((this.tripData()?.vehicleAssignmentId) ? reAssignLabel : assignLabel);
  }

  get driverControl() {
    return this.assignForm.get('vehicleAssignmentId') as FormControl;
  }

  getDriverVehicleList() {
    this.commonService.getVehicleDriverList().subscribe({
      next: (response: SuccessResponse<DropdownOption[]>) => {
        if (this.tripData()?.vehicleAssignmentId) {
          this.driverList.set(response.data.filter(x=>x.value!==this.tripData()?.vehicleAssignmentId));
        }
        else {
          this.driverList.set(response.data ?? []);
        }
      },
      error: () => {
        this.driverList.set([]);
      }
    });
  }

  assignDriverVehicle(tripId: string | undefined) {
    const assignRequest: TripAssignmentRequest = {
      vehicleAssignmentId: this.assignForm.value.vehicleAssignmentId,
      id: tripId
    }
    this.tripService.assignDriverToTrip(assignRequest).subscribe({
      next: (response: SuccessResponse<string>) => {
        this.snackBarService.success(response.messages[0]);
        this.dialogRef.close(true);
      }
    });
  }

  unAssignDriverVehicle() {
    this.tripService.unAssignDriverToTrip(this.tripData()?.id ?? '').subscribe({
      next: (response: SuccessResponse<string>) => {
        this.snackBarService.success(response.messages[0]);
        this.dialogRef.close(true);
      }
    });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
