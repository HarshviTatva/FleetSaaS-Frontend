import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonColor } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { ValidationMessages } from '../../../../shared/services/validation.service';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { errors } from '../../../../shared/utils/messages/error.static';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';
import { ResetPasswordRequest } from '../../../interface/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [
    ...MATERIAL_IMPORTS,
    SharedModule,
    RouterModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})

export class ResetPasswordComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  snackBarService = inject(SnackbarService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  buttonColor: ButtonColor = 'primary';
  responseMessage = signal<string>('');
  email = signal<string>('')
  resetPasswordForm!: FormGroup;

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

  passwordValidationMessages: ValidationMessages = {
    required: errors.password.required,
  };

  newPasswordValidationMessages: ValidationMessages = {
    required: errors.newPassword.required
  };

  get passwordControl() {
    return this.resetPasswordForm.get('password') as FormControl;
  }

  get newPasswordControl() {
    return this.resetPasswordForm.get('newPassword') as FormControl;
  }

  constructor() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.email.set(this.route.snapshot.queryParams['email']);
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
    const resetPasswordRequest: ResetPasswordRequest = {
      email: this.email(),
      password: this.resetPasswordForm.value.password,
      newPassword: this.resetPasswordForm.value.newPassword
    }
    this.authService.resetPassword(resetPasswordRequest).subscribe({
      next: (response) => {
        this.snackBarService.success(response.messages[0]);
        this.redirectToLogin();
      }
    });
  }

  redirectToLogin() {
    this.router.navigate([ROUTE_PATH.AUTH.LOGIN]);
  }
}
