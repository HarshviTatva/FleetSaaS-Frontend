import { UserRole } from "../../../shared/utils/enums/common.enum";

export interface UserRequest {
    userName:string;
    email:string;
    phoneNumber:string;
    role:UserRole;
    isActive:boolean;
    licenseNumber?:string;
    licenseExpiry?:Date;
    isAvailable?:boolean;
    companyId:string;
    id?:string;
    userId:string;
}

export interface UserDetailsResponse{
    userName:string;
    email:string;
    phoneNumber:string;
    roleName:string;
    isActive:boolean;
    licenseNumber?:string;
    licenseExpiry?:Date;
    isAvailable?:boolean;
}