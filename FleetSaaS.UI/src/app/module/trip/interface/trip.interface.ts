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
    distanceCovered?:number;
    scheduleDateFilter?:string|Date;
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
export interface CancelTripRequest{
    id:string;
    cancelReason?:string;
}
export interface ChangeTripStatusRequest{
  id:string;
  status:number;
  distanceCovered?:number;
  startedAt?:string;
  endedAt?:string;
}