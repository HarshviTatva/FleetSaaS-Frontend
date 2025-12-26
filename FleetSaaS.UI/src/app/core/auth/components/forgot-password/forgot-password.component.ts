import { Component } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { errors } from '../../../../shared/utils/messages/error.static';
import { InputComponent, InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { ValidationMessages } from '../../../../shared/services/validation.service';
import { ButtonColor } from '../../../../shared/modules/form-control/common-type/buttontype';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/modules/form-control/components/button/button.component';
import { ErrorComponent } from '../../../../shared/modules/form-control/components/error/error.component';
import { inject } from '@angular/core/primitives/di';

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    ErrorComponent,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})

export class ForgotPasswordComponent {
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  buttonColor: ButtonColor = 'primary';
  resetPasswordForm!: FormGroup;

  emailInputConfig: InputConfig = {
    key: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Enter Email',
    width: '100%',
    height: '45px'
  }

  passwordInputConfig: InputConfig = {
    key: 'password',
    label: 'Password',
    type: 'password',
    icon: 'visibility',
    placeholder: 'Enter your password',
    height: '45px'
  };

  newPasswordInputConfig: InputConfig = {
    key: 'newPassword',
    label: 'New Password',
    type: 'password',
    icon: 'visibility',
    placeholder: 'Enter your new password',
    height: '45px'
  };


  emailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat
  }

  passwordValidationMessages: ValidationMessages = {
    required: errors.password.required,
  };

  newPasswordValidationMessages: ValidationMessages = {
    required: errors.confirmPassword.required
  };

  get emailControl() {
    return this.resetPasswordForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.resetPasswordForm.get('password') as FormControl;
  }

  get newPasswordControl() {
    return this.resetPasswordForm.get('newPassword') as FormControl;
  }


  constructor() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', Validators.required,Validators.minLength(8)],
    });
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

  onNewPasswordToggle() {
    if (this.newPasswordInputConfig.type === 'text') {
      this.newPasswordInputConfig.type = 'password';
      this.newPasswordInputConfig.icon = 'visibility';
    } else {
      this.newPasswordInputConfig.type = 'text';
      this.newPasswordInputConfig.icon = 'visibility_off';
    }
  }

  submit() {
    if (this.resetPasswordForm.invalid) return;
    console.log(this.resetPasswordForm.value);
  }

  onCancel(){
    this.router.navigate(['/login']);
  }
}
