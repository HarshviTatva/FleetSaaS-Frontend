import { TripStatus } from "../../../shared/utils/enums/common.enum";

export interface TripResponse{
    trips:Trip[];
    companyId:number;
    totalCount:number;
}

export interface Trip {
    id:string;
    name:string;
    origin:string;
    destination:string;
    description:string;
    status:TripStatus;
    statusName:string;
    scheduledAt:string;
    scheduledAtString:string;
    vehicleDriverName?:string;
    vehicleAssignmentId?:string;
}

export interface TripRequest{
    id?:string;
    origin:string;
    destination:string;
    description?:string;
    scheduledAt?:string;
}

export interface TripAssignmentRequest{
    id?:string;
    vehicleAssignmentId:string;
}