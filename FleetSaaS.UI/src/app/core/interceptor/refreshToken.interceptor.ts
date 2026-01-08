import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { TokenService } from '../auth/services/token.service';
import { HttpService } from '../../shared/services/common/http.service';
import { apiEndPoints } from '../../shared/utils/api-endpoints.constant';
import { LoginResponse } from '../interface/login.response';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const http = inject(HttpService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (
        error.status === 401 &&
        !isRefreshing &&
        !req.url.includes(apiEndPoints.auth.refreshToken)
      ) {
        isRefreshing = true;

        return http.post<LoginResponse>(
          apiEndPoints.auth.refreshToken,
          {refreshToken:tokenService.getRefreshToken()},
          { withCredentials: true }
        ).pipe(
          switchMap(response => {
            tokenService.saveTokens(response);
            refreshTokenSubject.next(response.accessToken);
            isRefreshing = false;

            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.accessToken}`
                }
              })
            );
          }),
          catchError(error => {
            isRefreshing = false;
            tokenService.logout();
            return throwError(() => error);
          })
        );
      }

      return refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token =>
          next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        )
      );
      
    })
  );
};
