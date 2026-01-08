import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ErrorResponse, RequestOptions } from '../../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})

export class HttpService {
  http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiUrl;


  get<T>(path: string, options?: RequestOptions): Observable<T> {
    const url = this.apiBaseUrl + path;
    const handledOptions = this.handleRequestOptions(options);

    return this.http.get<T>(url, handledOptions).pipe(
      catchError(this.handleError));
  }

  post<T>(path: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.apiBaseUrl + path;
    const handledOptions = this.handleRequestOptions(options);

    return this.http.post<T>(url, body, handledOptions).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(path: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.apiBaseUrl + path;
    const handledOptions = this.handleRequestOptions(options);

    return this.http.put<T>(url, body, handledOptions).pipe(
      catchError(this.handleError)
    );
  }

  patch<T>(path: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.apiBaseUrl + path;
    const handledOptions = this.handleRequestOptions(options);

    return this.http.patch<T>(url, body, handledOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(path: string, options?: RequestOptions): Observable<T> {
    const url = this.apiBaseUrl + path;
    const handledOptions = this.handleRequestOptions(options);

    return this.http.delete<T>(url, handledOptions).pipe(
      catchError(this.handleError)
    );
  }

  download(path: string, body: any, options?: RequestOptions): Observable<Blob> {
    return this.http.post(this.apiBaseUrl + path, body, {
      ...options,
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  downloadReport(path: string,  options?: RequestOptions): Observable<Blob> {
    return this.http.get(this.apiBaseUrl + path, {
      ...options,
      responseType: 'blob'
    }).pipe(
      catchError(this.handleError)
    );
  }

  //#region Private Methods
  private handleRequestOptions(options?: RequestOptions): RequestOptions {
    return options!;
  }


  // http service level error handler
  private handleError(errResponse: ErrorResponse) {
    return throwError(() => errResponse);
  }
  //#endregion
}
