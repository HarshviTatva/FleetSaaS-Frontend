import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interface/login.response';
import { UserRole } from '../../../shared/utils/enums/common.enum';
import { ROUTE_PATH } from '../../../shared/utils/route-path.static';
import { SnackbarService } from '../../../shared/services/snackbar-service';
import { success } from '../../../shared/utils/messages/success.static';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private readonly snackbarService = inject(SnackbarService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private readonly prefix = 'APP_';

  private hashKey(raw: string): string {
    return btoa(this.prefix + raw); // base64 encode for simplicity
  }

  private readonly accessTokenKey = this.hashKey('access_token');
  private readonly refreshTokenKey = this.hashKey('refresh_token');

  private getDecodedToken(): any | null {
    const token = this.getAccessToken();
    if (!token) return '';

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  saveTokens(loginResponse: LoginResponse) {
    localStorage.setItem(this.accessTokenKey, loginResponse.accessToken);
    localStorage.setItem(this.refreshTokenKey, loginResponse.refreshToken);
  }

  logout(): void {
    if (this.getUserRoleFromToken()) {
      this.authService.logout().subscribe({
        next: () => {
          localStorage.removeItem(this.accessTokenKey);
          localStorage.removeItem(this.refreshTokenKey);
          this.snackbarService.success(success.logout);
          this.router.navigate([ROUTE_PATH.AUTH.LOGIN]);
        }
      })
    }
  }

  isTokenExpired(): boolean {
    const expiry = this.getDecodedToken()?.exp;
    if (!expiry) return true;

    // The `exp` field in a JWT is in seconds since the Unix epoch.
    // JavaScript's Date.now() returns milliseconds since the epoch,
    // so we multiply by 1000 to convert `exp` to milliseconds for accurate comparison.
    const expiryDateTime = expiry * 1000;
    return Date.now() > expiryDateTime;
  }

  isProfileFilled(): boolean {
    const value = this.getDecodedToken()?.ipf;
    return value === true || value === 'true';
  }

  getUserRoleFromToken(): UserRole | null {
    const decoded = this.getDecodedToken();

    if (!decoded?.RoleId) return null;

    const role = decoded.RoleId;

    if (!isNaN(role)) {
      return Number(role) as UserRole;
    }

    // if (typeof role === 'string') {
    //   return UserRole[decoded.Role as keyof typeof UserRole];
    // }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUserNameFromToken(): string {
    return `${this.getDecodedToken()?.Username}`.trim();
  }

  getCompanyId(): string {
    return `${this.getDecodedToken()?.CompanyId}`;
  }

  getUserId(): string {
    return `${this.getDecodedToken()?.UserId}`;
  }
}
