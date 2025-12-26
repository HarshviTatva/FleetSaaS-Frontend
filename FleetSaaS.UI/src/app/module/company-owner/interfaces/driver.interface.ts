export interface DriverResponse {
    driversList:Driver[];
    companyId:string;
    role:string;
}

export interface Driver{
    Id:string;
    UserId:string;
    UserName:string;
    Email:string;
    PhoneNumber:string;
    LicenseNumber:string;
    LicenseExpiryDate:Date;
    isAvailable?:boolean;
    isActive?:boolean;
    isAvail?:string;
    isAct?:string;
}