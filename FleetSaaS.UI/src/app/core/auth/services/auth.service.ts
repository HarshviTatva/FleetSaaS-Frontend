import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../shared/services/common/http.service';
import { SuccessResponse } from '../../../shared/interfaces/common.interface';
import { CompanyUserRegisterRequest, LoginRequest } from '../../interface/auth.interface';
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
}
