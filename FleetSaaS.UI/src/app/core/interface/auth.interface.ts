export interface CompanyUserRegisterRequest  {
    companyName:string;
    email:string;
    phoneNumber:string;
    ownerName:string;
    ownerEmail:string;
    ownerPhoneNumber:string;
    password:string;
}

export interface LoginRequest{
    email:string;
    password:string;
    rememberMe:boolean;
}

export interface ResetPasswordRequest{
    email:string;
    password:string;
    newPassword:string;
}