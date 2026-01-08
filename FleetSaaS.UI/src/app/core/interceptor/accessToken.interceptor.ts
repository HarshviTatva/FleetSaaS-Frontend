import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../auth/services/token.service";

export const accessTokenInterceptor: HttpInterceptorFn = (
  httpRequest: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getAccessToken();

  let authReq = httpRequest;
  if (accessToken) {
    authReq = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq);
};