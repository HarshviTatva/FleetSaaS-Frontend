import { CommonModule } from "@angular/common";
import { Component, inject, signal, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { InputConfig } from "../../../../../shared/modules/form-control/components/input/input.component";
import { SnackbarService } from "../../../../../shared/services/snackbar-service";
import { ValidationMessages } from "../../../../../shared/services/validation.service";
import { fields, licenseNumberRegex } from "../../../../../shared/utils/constant.static";
import { errors } from "../../../../../shared/utils/messages/error.static";
import { DriverService } from "../../../../services/driver.service";
import { ErrorResponse, SuccessResponse } from "../../../../../shared/interfaces/common.interface";
import { Driver } from "../../../interfaces/driver.interface";
import { SharedModule } from "../../../../../shared/modules/shared.module";
import { MATERIAL_IMPORTS } from "../../../../../shared/utils/material.static";

@Component({
  selector: 'app-add-edit-driver',
  imports: [...MATERIAL_IMPORTS, SharedModule, CommonModule],
  templateUrl: './add-edit-driver.component.html',
  styleUrl: './add-edit-driver.component.scss',
})

export class AddEditDriverComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly driverService = inject(DriverService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<Driver>);

  driverForm!: FormGroup;
  driverData!: Driver;
  minLicenseExpiryDate = signal<Date>(this.calculateMinDate());

  constructor() {
    this.driverForm = this.formBuilder.group({
      id: [null],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      licenseNumber: ['', [Validators.required, Validators.pattern(licenseNumberRegex)]],
      licenseExpiryDate: ['', [Validators.required]],
      userId: [null],
      isAvailable: [false]
    });
  }

  ngOnInit(): void {
    this.driverForm.patchValue(this.dialogRef.componentInstance.data.data);
  }

  driverNameConfig: InputConfig = {
    key: 'userName',
    label: 'Driver Name',
    type: 'text',
    placeholder: 'Enter Driver Name',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  emailInputConfig: InputConfig = {
    key: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Enter Email',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  phoneNumberInputConfig: InputConfig = {
    key: 'phoneNumber',
    label: 'Phone Number',
    type: 'number',
    placeholder: 'Enter Phone number',
    width: '100%',
    height: '45px',
    showErrorSpacing: true,
    min: 10,
    max: 13
  }

  licenseNumberInputConfig: InputConfig = {
    key: 'licenseNumber',
    label: 'License Number',
    type: 'text',
    placeholder: 'MH1420110062821',
    width: '100%',
    height: '45px',
    showErrorSpacing: true,
    max: 15
  }

  driverNameValidationMessages: ValidationMessages = {
    required: errors.userName.required,
    pattern: errors.userName.pattern,
  };

  emailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat,
    userEmailExists: errors.email.userEmailExists
  }

  phoneNumberValidationMessages: ValidationMessages = {
    required: errors.phoneNumber.required,
    minLength: errors.phoneNumber.minLength,
    maxLength: errors.phoneNumber.maxLength
  };

  licenseNumberValidationMessages: ValidationMessages = {
    required: errors.licenseNumber.required,
    pattern: errors.licenseNumber.pattern,
    licenseExists: errors.licenseNumber.licenseExists
  };

  licenseExpiryDateValidationMessages: ValidationMessages = {
    required: errors.licenseDate.required
  };


  get driverNameControl() {
    return this.driverForm.get('userName') as FormControl;
  }

  get emailControl() {
    return this.driverForm.get('email') as FormControl;
  }

  get phoneNumberControl() {
    return this.driverForm.get('phoneNumber') as FormControl;
  }

  get licenseNumberControl() {
    return this.driverForm.get('licenseNumber') as FormControl;
  }

  get licenseExpiryDateControl() {
    return this.driverForm.get('licenseExpiryDate') as FormControl;
  }

  private calculateMinDate(): Date {
    const today = new Date();
    return new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );
  }

  submit() {
    if (this.driverForm.invalid) {
      this.snackBarService.error(errors.fillCorrectForm.correctDetails);
    }
    else {
      const value = this.driverForm.getRawValue();
      const driverRequest = {
        ...value,
        licenseExpiryDate: value.licenseExpiryDate
          ? new Date(value.licenseExpiryDate).toISOString().split('T')[0]
          : null
      };
      this.driverService.addEditDriverUser(driverRequest).subscribe({
        next: (response: SuccessResponse<null>) => {
          this.dialogRef.close(true);
          this.snackBarService.success(response.messages[0]);
        },
        error: (error: ErrorResponse) => {
          if (error.metadata['field'] == fields.email) {
            this.emailControl.setErrors({ userEmailExists: error.messages[0] });
          }
          else if (error.metadata['field'] == fields.licenseNumber) {
            this.licenseNumberControl.setErrors({ licenseExists: error.messages[0] });
          }
        }
      });
    }
  }
}
