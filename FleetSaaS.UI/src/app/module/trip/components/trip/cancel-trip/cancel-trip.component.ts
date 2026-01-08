import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { TripService } from '../../../../services/trip.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { CancelTripRequest, Trip } from '../../../interface/trip.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cancel-trip',
  imports: [SharedModule],
  templateUrl: './cancel-trip.component.html',
  styleUrl: './cancel-trip.component.scss',
})
export class CancelTripComponent {

  private readonly tripService = inject(TripService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<Trip>);

  cancelReason = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.maxLength(500)
    ]
  });
  
  cancelTrip() {
    const cancelTripRequest: CancelTripRequest = {
      id: this.dialogRef.componentInstance.data.data.id,
      cancelReason: this.cancelReason.value ?? ''
    }
    this.tripService.cancelTrip(cancelTripRequest).subscribe((response: SuccessResponse<boolean>) => {
      if (response.result) {
        this.snackBarService.success(response.messages[0]);
        this.dialogRef.close(true);
      }
    })
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
