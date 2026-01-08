import { Component, inject, signal } from '@angular/core';
import { CancelTripRequest, ChangeTripStatusRequest, Trip } from '../../../interface/trip.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { TripService } from '../../../../services/trip.service';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { TripStatus } from '../../../../../shared/utils/enums/common.enum';
import { MATERIAL_IMPORTS } from '../../../../../shared/utils/material.static';
import { FormControl, Validators } from '@angular/forms';
import { InputConfig } from '../../../../../shared/modules/form-control/components/input/input.component';
import { TripMessage } from '../../../../../shared/utils/messages/error.static';

@Component({
  selector: 'app-trip-status',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './trip-status.component.html',
  styleUrl: './trip-status.component.scss',
})
export class TripStatusComponent {

  private readonly tripService = inject(TripService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<Trip>);

  distanceCoveredControl = new FormControl<number | null>(null, {
    validators: [
      Validators.required,
      Validators.min(1),
      Validators.pattern(/^[0-9]+$/)
    ]
  });

  startTimeControl = new FormControl<string>('',{
    validators:[Validators.required]
  });

  tripData = signal<Trip>(this.dialogRef.componentInstance.data.data);

  distanceCoveredConfig: InputConfig = {
    key: 'distanceCovered',
    label: 'Total Trip Distance (in Km.)',
    type: 'number',
    placeholder: 'Total Trip Distance (in Km.)',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  submit() {
    const scheduledAt = new Date(this.tripData().scheduleDateFilter!);
    const now = new Date();
    const allowedEndTime = new Date(scheduledAt.getTime() + 30 * 60 * 1000);
    const allowedStartTime = new Date(scheduledAt.getTime() - 5 * 60 * 1000);
    if( (now < allowedStartTime) && this.tripData().status === TripStatus.Accepted){
      this.snackBarService.error(TripMessage.EarlyStart);
      this.dialogRef.close(true);
      return;
    }
    if (((this.tripData().status === TripStatus.Assigned) ||  (this.tripData().status === TripStatus.Accepted)) && now > allowedEndTime) {

      this.snackBarService.error(TripMessage.Cancelled);
      
      const cancelTripRequest: CancelTripRequest = {
        id: this.dialogRef.componentInstance.data.data.id,
        cancelReason: 'Cancelled Automatically!'
      }
      this.tripService.cancelTrip(cancelTripRequest).subscribe((response: SuccessResponse<boolean>) => {
        if (response.result) {
          this.snackBarService.success(response.messages[0]);
          this.dialogRef.close(true);
          return;
        }
      });
    }
    if (this.tripData().status == TripStatus.Assigned) {
      this.tripData().status = TripStatus.Accepted
    }
    else if (this.tripData().status == TripStatus.Accepted) {
      this.tripData().status = TripStatus.Started
    }
    else if (this.tripData().status == TripStatus.Started) {
      this.tripData().status = TripStatus.Completed;
    }

    //for adding start at and end at - flow
    // var changeTripStatusRequest : ChangeTripStatusRequest = {
    //   id: this.tripData().id,
    //   status:  this.tripData().status,
    //   distanceCovered:this.distanceCoveredControl.value!,
    //   startedAt:
    //   endedAt:
    // }
    this.tripService.changeTripStatus(this.tripData().id, this.tripData().status, this.distanceCoveredControl.value!).subscribe((response: SuccessResponse<boolean>) => {
      if (response.result) {
        this.snackBarService.success(response.messages[0]);
        this.dialogRef.close(true);
      }
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }

  isSubmitDisabled(): boolean {
    if (this.tripData().status === TripStatus.Started) {
      return this.distanceCoveredControl.invalid;
    }
    return false;
  }

}
