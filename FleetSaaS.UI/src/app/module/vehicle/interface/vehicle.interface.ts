export interface VehicleRequest{
    Id?:number;
    make:string;
    model:string;
    year:number;
    vin:string;
    insuranceExpiryDate:string;
    isActive:boolean;
    licensePlater:string;
    userId?:string;
}

export interface VehicleResponse{
    vehicles:Vehicle[];
    companyId:number;
    totalCount:number;
}

export interface Vehicle {
    id:string;
    make:string;
    model:string;
    year:number;
    vin:string;
    insuranceExpiryDate:Date;
    insuranceExpiryDateString:string;
    isActive:boolean;
    isAct:string;
    licensePlate:string;
}