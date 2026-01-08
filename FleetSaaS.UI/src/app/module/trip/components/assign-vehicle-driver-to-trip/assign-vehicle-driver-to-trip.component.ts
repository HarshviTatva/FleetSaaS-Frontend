import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { DropdownOption } from '../../../../shared/modules/form-control/interface/select.interface';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { assignLabel, reAssignLabel } from '../../../../shared/utils/constant.static';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { CommonService } from '../../../services/common.service';
import { TripService } from '../../../services/trip.service';
import { Trip, TripAssignmentRequest } from '../../interface/trip.interface';

@Component({
  selector: 'app-assign-vehicle-driver-to-trip',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './assign-vehicle-driver-to-trip.component.html',
  styleUrl: './assign-vehicle-driver-to-trip.component.scss',
})
export class AssignVehicleDriverToTripComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly tripService = inject(TripService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly commonService = inject(CommonService);
  private readonly dialogRef = inject(MatDialogRef<Trip>);

  assignForm !: FormGroup;

  driverList = signal<DropdownOption[]>([]);
  tripData = signal<Trip | null>(null);
  btnLabel = signal('Assign');
  isListEmpty = signal<boolean>(true);

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
        this.isListEmpty.set(this.driverList().length > 0);
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
