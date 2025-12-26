import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../../shared/services/snackbar-service';
import { errors } from '../../shared/utils/messages/error.static';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const customError = {
        status: error.status,
        messages: [errors.exceptions.unhandled],
        metadata: null,
      };

      if (error.error) {
        if (Array.isArray(error.error.messages)) {
          customError.messages = error.error.messages;
        }

        if (error.error.metadata) {
          customError.metadata = error.error.metadata;
        }
      }

      snackbarService.error(customError.messages.join(', '));

      return throwError(() => customError);
    }),
  );
};