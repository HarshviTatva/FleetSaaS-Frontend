import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../shared/services/common/http.service';
import { SuccessResponse } from '../../../shared/interfaces/common.interface';
import { CompanyUserRegisterRequest, LoginRequest, ResetPasswordRequest } from '../../interface/auth.interface';
import { LoginResponse } from '../../interface/login.response';
import { apiEndPoints } from '../../../shared/utils/api-endpoints.constant';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly httpService = inject(HttpService);

  signUpCompanyUser(signupRequest:CompanyUserRegisterRequest):Observable<SuccessResponse<null>>{
    return this.httpService.post<SuccessResponse<null>>(
      apiEndPoints.auth.signup,
      signupRequest
    );
  }

  login(loginRequest: LoginRequest):Observable<SuccessResponse<LoginResponse>>{
    return this.httpService.post<SuccessResponse<LoginResponse>>(
      apiEndPoints.auth.login,
      loginRequest
    );
  }

  logout():Observable<SuccessResponse<null>>{
    return this.httpService.post<SuccessResponse<null>>(
      apiEndPoints.auth.logout,
      null
    );
  }

  forgotPassword(email:string):Observable<SuccessResponse<null>>{
    return this.httpService.post<SuccessResponse<null>>(
      apiEndPoints.auth.forgotPassword+email,
      null
    );
  }

  resetPassword(resetPasswordRequest:ResetPasswordRequest):Observable<SuccessResponse<null>>{
    return this.httpService.post<SuccessResponse<null>>(
      apiEndPoints.auth.resetPassword,
      resetPasswordRequest
    );
  }
}
