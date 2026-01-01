import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InputConfig } from '../../../../../shared/modules/form-control/components/input/input.component';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { ValidationMessages } from '../../../../../shared/services/validation.service';
import { errors } from '../../../../../shared/utils/messages/error.static';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../shared/material/material.module';
import { DispatcherService } from '../../../../services/dispatcher.service';
import { SuccessResponse, ErrorResponse } from '../../../../../shared/interfaces/common.interface';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-add-edit-dispatcher',
  imports: [MaterialModule,SharedModule,CommonModule],
  templateUrl: './add-edit-dispatcher.component.html',
  styleUrl: './add-edit-dispatcher.component.scss',
})

export class AddEditDispatcherComponent implements OnInit {
private readonly formBuilder = inject(FormBuilder);
  private readonly dispatcherService = inject(DispatcherService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<any>);
  dispatcherForm!: FormGroup;

  constructor() {
    this.dispatcherForm = this.formBuilder.group({
      id:[null],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      userId:[null]
    });
  }

  ngOnInit():void{
    this.dispatcherForm.patchValue(this.dialogRef.componentInstance.data.data);
  }

  userNameConfig: InputConfig = {
    key: 'userName',
    label: 'User Name',
    type: 'text',
    placeholder: 'Enter Name',
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

  userNameValidationMessages: ValidationMessages = {
    required: errors.userName.required,
    pattern: errors.userName.pattern,
  };

  emailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat
  }

  phoneNumberValidationMessages: ValidationMessages = {
    required: errors.phoneNumber.required,
    minLength: errors.phoneNumber.minLength,
    maxLength: errors.phoneNumber.maxLength
  };

  get userNameControl() {
    return this.dispatcherForm.get('userName') as FormControl;
  }

  get emailControl() {
    return this.dispatcherForm.get('email') as FormControl;
  }

  get phoneNumberControl() {
    return this.dispatcherForm.get('phoneNumber') as FormControl;
  }

  submit() {
    if (this.dispatcherForm.invalid){
      this.snackBarService.error(errors.fillCorrectForm.correctDetails);
    }
    else{
      this.dispatcherService.addEditDispatcherUser(this.dispatcherForm.value).subscribe({
        next: (response:SuccessResponse<null>) => {
            this.snackBarService.success(response.messages[0]);
            this.dialogRef.close(true);
          }
      });
    }
  }
}
