import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { InputConfig } from '../../../../../shared/modules/form-control/components/input/input.component';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { TripService } from '../../../../services/trip.service';
import { Trip, TripRequest } from '../../../interface/trip.interface';
import { MATERIAL_IMPORTS } from '../../../../../shared/utils/material.static';

@Component({
  selector: 'app-add-edit-trip',
  imports: [SharedModule, ReactiveFormsModule, ...MATERIAL_IMPORTS, CommonModule],
  templateUrl: './add-edit-trip.component.html',
  styleUrl: './add-edit-trip.component.scss',
})

export class AddEditTripComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackbarService);
  private readonly tripService = inject(TripService);
  private readonly dialogRef = inject(MatDialogRef<Trip>);

  tripForm!: FormGroup;
  today = signal(new Date);
  datetimeChanged = signal<boolean>(false);

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
      scheduledAt: [null],
      scheduledDate: [null],
      scheduledTime: [null]
    });
  }

  ngOnInit(): void {
    if (this.dialogRef.componentInstance.data.data.id) {
      this.tripForm.patchValue(this.dialogRef.componentInstance.data.data);

      if (this.dialogRef.componentInstance.data.data?.scheduledAt) {
        this.splitScheduledAt(this.dialogRef.componentInstance.data.data.scheduledAt);
      }
    }

    this.tripForm.get('scheduledDate')!.valueChanges.subscribe(() => {
      this.datetimeChanged.set(true);
      this.updateScheduledAt();
    });

    this.tripForm.get('scheduledTime')!.valueChanges.subscribe(() => {
      this.datetimeChanged.set(true);
      this.updateScheduledAt();
    });

  }

  private splitScheduledAt(scheduledAt: string | Date): void {
    const date = new Date(scheduledAt);

    if (isNaN(date.getTime())) return;

    this.tripForm.patchValue(
      {
        scheduledDate: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ),
        scheduledTime: new Date(
          0, 0, 0,
          date.getHours(),
          date.getMinutes()
        )
      },
      { emitEvent: true }
    );
  }

  updateScheduledAt(): void {
    if (!this.datetimeChanged()) {
      return;
    }

    const date: Date | null = this.tripForm.get('scheduledDate')?.value;
    const time: Date | null = this.tripForm.get('scheduledTime')?.value;

    if (!date || !time) {
      this.tripForm.patchValue({ scheduledAt: null }, { emitEvent: false });
      return;
    }

    const scheduledAt = new Date(date);
    scheduledAt.setHours(
      time.getHours(),
      time.getMinutes(),
      0,
      0
    );

    this.tripForm.patchValue(
      { scheduledAt },
      { emitEvent: true }
    );
  }

  submit() {
    const payload: TripRequest = {
      ...this.tripForm.value,
      scheduledAt: this.tripForm.value.scheduledAt
    };
    this.tripService.addEditTrip(payload).subscribe({
      next: (response: SuccessResponse<null>) => {
        this.snackBarService.success(response.messages[0]);
        this.dialogRef.close(true);
      }
    });
  }
}
