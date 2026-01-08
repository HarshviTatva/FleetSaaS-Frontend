import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AllowAlphabetOnlyDirective } from '../../../../shared/directives/allow-alphabet-only.directive';
import { AllowNumberOnlyDirective } from '../../../../shared/directives/allow-number-only.directive';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { ButtonColor } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { ValidationMessages } from '../../../../shared/services/validation.service';
import { primaryColor } from '../../../../shared/utils/constant.static';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { errors } from '../../../../shared/utils/messages/error.static';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_IMPORTS,
    SharedModule,
    RouterModule,
    AllowAlphabetOnlyDirective,
    AllowNumberOnlyDirective
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})

export class SignupComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly router = inject(Router);

  buttonColor: ButtonColor = primaryColor;
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirm = true;

  companyNameConfig: InputConfig = {
    key: 'companyName',
    label: 'Company Name',
    type: 'text',
    placeholder: 'Enter Company name',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  phoneNumberInputConfig: InputConfig = {
    key: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    placeholder: 'Enter Phone number',
    width: '100%',
    height: '45px',
    showErrorSpacing: true,
    min: 10,
    max: 13
  }

  ownerPhoneNumberInputConfig: InputConfig = {
    key: 'ownerPhoneNumber',
    label: 'Owner Phone Number',
    type: 'text',
    placeholder: 'Enter Phone number',
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

  ownerEmailInputConfig: InputConfig = {
    key: 'ownerEmail',
    label: 'Owner Email',
    type: 'text',
    placeholder: 'Enter Owner Email',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  ownerNameConfig: InputConfig = {
    key: 'ownerName',
    label: 'Owner Name',
    type: 'text',
    placeholder: 'Enter owner name',
    width: '100%',
    height: '45px',
    showErrorSpacing: true
  }

  passwordInputConfig: InputConfig = {
    key: 'password',
    label: 'Password',
    type: 'password',
    icon: 'visibility',
    placeholder: 'Enter your password',
    height: '45px',
    width: '100%',
    showErrorSpacing: true
  };

  confirmPasswordInputConfig: InputConfig = {
    key: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    icon: 'visibility',
    placeholder: 'Re-enter your password',
    height: '45px',
    width: '100%',
    showErrorSpacing: true
  };

  companyNameValidationMessages: ValidationMessages = {
    required: errors.companyName.required,
    pattern: errors.companyName.pattern,
  };

  ownerNameValidationMessages: ValidationMessages = {
    required: errors.userName.required,
    pattern: errors.userName.pattern,
  };

  emailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat
  }

  ownerEmailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat
  }

  passwordValidationMessages: ValidationMessages = {
    required: errors.password.required,
  };

  confirmPasswordValidationMessages: ValidationMessages = {
    required: errors.confirmPassword.required,
    mismatch: errors.confirmPassword.match
  };

  phoneNumberValidationMessages: ValidationMessages = {
    required: errors.phoneNumber.required,
    minLength: errors.phoneNumber.minLength,
    maxLength: errors.phoneNumber.maxLength
  };

  ownerPhoneNumberValidationMessages: ValidationMessages = {
    required: errors.phoneNumber.required,
    minLength: errors.phoneNumber.minLength,
    maxLength: errors.phoneNumber.maxLength
  };

  constructor() {
    this.signupForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ownerName: ['', [Validators.required]],
      ownerEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
      ownerphoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]]
    },
      { validators: this.passwordMatchValidator });
  }

  get companyNameControl() {
    return this.signupForm.get('companyName') as FormControl;
  }

  get ownerNameControl() {
    return this.signupForm.get('ownerName') as FormControl;
  }

  get emailControl() {
    return this.signupForm.get('email') as FormControl;
  }

  get ownerEmailControl() {
    return this.signupForm.get('ownerEmail') as FormControl;
  }

  get passwordControl() {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  get phoneNumberControl() {
    return this.signupForm.get('phoneNumber') as FormControl;
  }

  get ownerphoneNumberControl() {
    return this.signupForm.get('ownerphoneNumber') as FormControl;
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (confirmPassword && password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      if (formGroup.get('confirmPassword')?.hasError('mismatch')) {
        formGroup.get('confirmPassword')?.updateValueAndValidity({ onlySelf: true });
      }
    }
    return null;
  }

  onPasswordToggle() {
    if (this.passwordInputConfig.type === 'text') {
      this.passwordInputConfig.type = 'password';
      this.passwordInputConfig.icon = 'visibility';
    } else {
      this.passwordInputConfig.type = 'text';
      this.passwordInputConfig.icon = 'visibility_off';
    }
  }

  onConfirmPasswordToggle() {
    if (this.confirmPasswordInputConfig.type === 'text') {
      this.confirmPasswordInputConfig.type = 'password';
      this.confirmPasswordInputConfig.icon = 'visibility';
    } else {
      this.confirmPasswordInputConfig.type = 'text';
      this.confirmPasswordInputConfig.icon = 'visibility_off';
    }
  }

  submit() {
    if (!this.signupForm.invalid) {
      this.authService.signUpCompanyUser(this.signupForm.value).subscribe((response: SuccessResponse<null>) => {
        this.snackBarService.success(response.messages[0]);
        this.router.navigate([ROUTE_PATH.AUTH.LOGIN]);
      })
    }
    else {
      this.snackBarService.error(errors.fillCorrectForm.correctDetails);
    }
  }
}
