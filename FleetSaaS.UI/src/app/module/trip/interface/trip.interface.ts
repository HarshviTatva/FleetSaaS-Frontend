import { TripStatus } from "../../../shared/utils/enums/common.enum";

export interface TripResponse{
    trips:Trip[];
    companyId:number;
}

export interface Trip {
    id:string;
    name:string;
    origin:string;
    destination:string;
    description:string;
    status:TripStatus;
    statusName:string;
}

export interface TripRequest{
    id?:string;
    origin:string;
    destination:string;
    description:string;
}