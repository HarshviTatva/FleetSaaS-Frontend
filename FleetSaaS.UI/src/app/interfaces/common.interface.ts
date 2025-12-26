import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface RequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  messages: string[];
  data: T;
  additionalInfo: any;
}

export interface ErrorResponse {
  status: number;
  errors: string[];
}

export interface SuccessResponse<T> {
  data: T;
  additionalInfo: any;
  messages: string[];
  result:boolean;
}