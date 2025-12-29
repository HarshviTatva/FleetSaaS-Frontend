import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../../../shared/modules/form-control/components/button/button.component';
import { ErrorComponent } from '../../../../shared/modules/form-control/components/error/error.component';
import { InputComponent, InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { ButtonColor } from '../../../../shared/modules/form-control/common-type/buttontype';
import { errors } from '../../../../shared/utils/messages/error.static';
import { ValidationMessages } from '../../../../shared/services/validation.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../../interface/login.response';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { primaryColor } from '../../../../shared/utils/constant.static';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';
import { TokenService } from '../../services/token.service';
import { MaterialModule } from '../../../../shared/material/material.module';

@Component({
  selector: 'app-login',
  imports: [
    MaterialModule,
    ButtonComponent,
    InputComponent,
    ErrorComponent,
    RouterModule,
    MatCheckboxModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly snackbarService = inject(SnackbarService);
  private readonly authService = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly router = inject(Router);
  private readonly fb=inject(FormBuilder);

  buttonColor: ButtonColor = primaryColor;
  loginForm!: FormGroup;

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

  emailValidationMessages: ValidationMessages = {
    required: errors.email.required,
    email: errors.email.emailFormat
  }

   passwordValidationMessages: ValidationMessages = {
    required: errors.password.required,
  };

  constructor(
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe:[false]
    });
  }

  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    if(this.tokenService.getAccessToken()!==null){
      this.router.navigate([ROUTE_PATH.layout.commonlayout]);
    }
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

  submit() {
    if (this.loginForm.invalid){
      this.snackbarService.error(errors.fillCorrectForm.correctDetails);
    }
    else{
      this.authService.login(this.loginForm.value).subscribe((response:SuccessResponse<LoginResponse>)=>{
        if(response.result){
          this.snackbarService.success(response.messages[0]);
          this.tokenService.saveTokens(response.data);
          this.router.navigate([ROUTE_PATH.layout.commonlayout]);
        }
      });
    }
  }
}
