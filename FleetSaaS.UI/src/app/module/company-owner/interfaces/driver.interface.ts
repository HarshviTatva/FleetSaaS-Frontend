export interface DriverResponse {
    driversList:Driver[];
    companyId:string;
    role:string;
}

export interface Driver{
    id:string;
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
    isVehicleAssigned?:boolean;
    vehicleAssignmentId?:string;
    vehicleName?:string;
}

export interface VehicleAssignmentRequest{
    id?:string;
    vehicleId:string;
    driverId:string;
}