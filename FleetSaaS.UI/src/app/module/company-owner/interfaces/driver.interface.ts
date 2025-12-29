export interface DriverResponse {
    driversList:Driver[];
    companyId:string;
    role:string;
}

export interface Driver{
    Id:string;
    userId:string;
    userName:string;
    email:string;
    phoneNumber:string;
    licenseNumber:string;
    licenseExpiryDate:string;
    isAvailable?:boolean;
    isActive?:boolean;
    isAvail?:string;
    isAct?:string;
}