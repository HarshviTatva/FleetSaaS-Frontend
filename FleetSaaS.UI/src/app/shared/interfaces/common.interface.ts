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
  messages:string[];
  metadata:any;
}

export interface SuccessResponse<T> {
  data: T;
  additionalInfo: any;
  messages: string[];
  result:boolean;
}

export interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
}
