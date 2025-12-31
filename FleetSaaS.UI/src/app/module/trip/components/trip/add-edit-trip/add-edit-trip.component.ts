import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { TripService } from '../../../../services/trip.service';
import { Trip } from '../../../interface/trip.interface';
import { InputConfig } from '../../../../../shared/modules/form-control/components/input/input.component';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';

@Component({
  selector: 'app-add-edit-trip',
  imports: [SharedModule, ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './add-edit-trip.component.html',
  styleUrl: './add-edit-trip.component.scss',
})

export class AddEditTripComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackbarService);
  private readonly tripService = inject(TripService);
  private readonly dialogRef = inject(MatDialogRef<Trip>);

  tripForm!: FormGroup;

  originConfig: InputConfig = {
    key: 'origin',
    label: 'From',
    type: 'text',
    placeholder: 'Trip Start from',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  destinationConfig: InputConfig = {
    key: 'destination',
    label: 'To',
    type: 'text',
    placeholder: 'Trip Ends at',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  get originControl() {
    return this.tripForm.get('origin') as FormControl;
  }

  get destinationControl() {
    return this.tripForm.get('destination') as FormControl;
  }

  get descriptionControl() {
    return this.tripForm.get('description') as FormControl;
  }

  constructor() {
    this.tripForm = this.formBuilder.group({
      id: [null],
      origin: ['', [Validators.required, Validators.maxLength(25)]],
      destination: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', [Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.tripForm.patchValue(this.dialogRef.componentInstance.data.data);
  }

  submit() {
    this.tripService.addEditTrip(this.tripForm.value).subscribe({
      next: (response: SuccessResponse<null>) => {
        this.snackBarService.success(response.messages[0]);
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.snackBarService.error(error.messages[0]);
      }
    });
  }
}
