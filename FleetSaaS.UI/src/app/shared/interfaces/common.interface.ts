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
}

export interface ErrorResponse {
  status: number;
  errors: string[];
  messages:string[];
  metadata:Record<string, unknown>;
}

export interface SuccessResponse<T> {
  data: T;
  messages: string[];
  result:boolean;
}

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
}
