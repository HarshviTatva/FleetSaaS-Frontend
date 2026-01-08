import { Component, inject, OnInit, signal } from '@angular/core';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { VehicleService } from '../../../../services/vehicle.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fields, licensePlateRegex, vinRegex } from '../../../../../shared/utils/constant.static';
import { InputConfig } from '../../../../../shared/modules/form-control/components/input/input.component';
import { ValidationMessages } from '../../../../../shared/services/validation.service';
import { errors } from '../../../../../shared/utils/messages/error.static';
import { SuccessResponse, ErrorResponse } from '../../../../../shared/interfaces/common.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from '../../../interface/vehicle.interface';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MATERIAL_IMPORTS } from '../../../../../shared/utils/material.static';

@Component({
  selector: 'app-add-edit-vehicle',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './add-edit-vehicle.component.html',
  styleUrl: './add-edit-vehicle.component.scss',
  standalone:true
})

export class AddEditVehicleComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackbarService);
  private readonly vehicleService = inject(VehicleService);
  private readonly dialogRef = inject(MatDialogRef<Vehicle>);

  vehicleForm!: FormGroup;
  minLicenseExpiryDate = signal<Date|null>(this.calculateMinDate());

  constructor() {
    this.vehicleForm = this.formBuilder.group({
      id: [null],
      make: ['', [Validators.required, Validators.maxLength(15)]],
      model: ['', [Validators.required, Validators.maxLength(15)]],
      vin: ['', [Validators.required, Validators.pattern(vinRegex)]],
      licensePlate: ['', [Validators.required, Validators.pattern(licensePlateRegex)]],
      insuranceExpiryDate: ['', [Validators.required]],
      year: [0, [Validators.required, Validators.maxLength(4)]],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.vehicleForm.patchValue(this.dialogRef.componentInstance.data.data);
  }

  private calculateMinDate(): Date {
    const today = new Date();
    return new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
  }

  makeConfig: InputConfig = {
    key: 'make',
    label: 'Make',
    type: 'text',
    placeholder: 'Enter Make Name',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  modelConfig: InputConfig = {
    key: 'model',
    label: 'Model',
    type: 'text',
    placeholder: 'Enter Model',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  vinConfig: InputConfig = {
    key: 'vin',
    label: 'VIN',
    type: 'text',
    placeholder: 'Enter Vehicle Identification Number',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  yearConfig: InputConfig = {
    key: 'year',
    label: 'Year',
    type: 'number',
    placeholder: 'Enter Year',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  licensePlateInputConfig: InputConfig = {
    key: 'licensePlate',
    label: 'License Plate',
    type: 'text',
    placeholder: 'GJ01AB1234',
    width: '100%',
    height: '45px',
    showErrorSpacing: true,
    max: 10
  }

  vinValidationMessages: ValidationMessages = {
    vinExists: errors.duplicateFields.vinExits
  }

  licensePlateValidationMessages: ValidationMessages = {
    exists: errors.duplicateFields.licensePlateExists
  };

  get makeControl() {
    return this.vehicleForm.get('make') as FormControl;
  }

  get modelControl() {
    return this.vehicleForm.get('model') as FormControl;
  }

  get vinControl() {
    return this.vehicleForm.get('vin') as FormControl;
  }

  get yearControl() {
    return this.vehicleForm.get('year') as FormControl;
  }

  get licensePlateControl() {
    return this.vehicleForm.get('licensePlate') as FormControl;
  }

  get insuranceExpiryDateControl() {
    return this.vehicleForm.get('insuranceExpiryDate') as FormControl;
  }

  submit() {
    if (this.vehicleForm.invalid) {
      this.snackBarService.error(errors.fillCorrectForm.correctDetails);
    }
    else {
      const value = this.vehicleForm.getRawValue();

      let insuranceExpiryDate: string | null = null;

      if (value.insuranceExpiryDate) {
        const date = new Date(value.insuranceExpiryDate);
        insuranceExpiryDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }
      
      const vehicleRequest = {
        ...value,
        insuranceExpiryDate: insuranceExpiryDate
      };
      this.vehicleService.addEditVehicle(vehicleRequest).subscribe({
        next: (response: SuccessResponse<null>) => {
          this.dialogRef.close(true);
          this.snackBarService.success(response.messages[0]);
        },
        error: (error: ErrorResponse) => {
          if (error.metadata['field'] == fields.vin) {
            this.vinControl.setErrors({ vinExists: error.messages[0] });
          }
          else if (error.metadata['field'] == fields.licensePlate) {
            this.licensePlateControl.setErrors({ exists: error.messages[0] });
          }
        }
      });
    }
  }

}
