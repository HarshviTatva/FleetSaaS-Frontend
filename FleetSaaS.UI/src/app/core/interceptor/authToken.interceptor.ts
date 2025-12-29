import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { TokenService } from "../auth/services/token.service";
import { errors } from "../../shared/utils/messages/error.static";

export const authTokenInterceptor: HttpInterceptorFn = (
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

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        tokenService.logout();
      }
      else{
        // Use a custom error message so errorHandlerInterceptor can detect it
        const sessionExpiredError = new HttpErrorResponse({
          error: {
            messages: [errors.session.expired],
          },
        });

        return throwError(() => sessionExpiredError);
      }

      return throwError(() => error);
    }),
  );
};