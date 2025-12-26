import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';

let activeRequests = 0;

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  activeRequests++;
  loader.show();

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        loader.hide();
      }
    })
  );
};
