import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonColor } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ValidationMessages } from '../../../../shared/services/validation.service';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { errors } from '../../../../shared/utils/messages/error.static';
import { AuthService } from '../../services/auth.service';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ...MATERIAL_IMPORTS,
    SharedModule,
    RouterModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})

export class ForgotPasswordComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  buttonColor: ButtonColor = 'primary';
  responseMessage = signal<string>('');
  forgotPasswordForm!: FormGroup;

  emailInputConfig: InputConfig = {
    key: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Enter Email',
    width: '100%',
    height: '45px'
  }

  emailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat
  }

  get emailControl() {
    return this.forgotPasswordForm.get('email') as FormControl;
  }

  constructor() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.forgotPasswordForm.invalid) return;
    this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
        next:(response)=>{
          this.responseMessage.set(response.messages[0]);
        }
    });
  }

  onCancel(){
    this.router.navigate([ROUTE_PATH.AUTH.LOGIN]);
  }
}
