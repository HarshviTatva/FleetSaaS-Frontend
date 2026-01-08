import { TripStatus } from "../../../shared/utils/enums/common.enum";

export interface CompanyUserDashboardResponse{
     totalVehicleCount?  :number;    
     totalActiveVehicleCount?:number;
     totalPlannedTrips?:number;       
     totalDriversCount?:number;   
     totalCompletedTrips?:number;  
     totalTrips?:number;      
     totalOngoingTrips?:number;   
     licenseExpiryAlerts?:ExpiryAlertDTO[]
}

export interface ExpiryAlertDTO {
  type: string;
  reference: string;        // LicenseNumber / Plate
  expiryDate: string;       // ISO string
  isExpired: boolean;
}

export interface DispatcherDashboardResponse{
  activeTrips: number;
  upcomingTrips: number;
  drivers: DriverSummaryDTO;
  trips: ActiveTripDTO[];
  upcoming: UpcomingTripDTO[];
}

export interface ActiveTripDTO {
  tripNo: string;
  status: TripStatus;
  driverName: string;
  vehicle: string;
}

export interface DriverSummaryDTO {
  total: number;
  available: number;
  onTrip: number;
  unavailable: number;
}

export interface UpcomingTripDTO {
  id:number;
  tripNo: string;
  time: string;     
  route: string;
}

export interface DriverDashboardResponse {
  todayTrips: DriverTodayTrip[];
  completedTrips: DriverCompletedTrip[];
  acceptedTripsCount:number;
  cancelledTripsCount:number;
  totalTrips: number;
  completedTripsCount: number;
}

export interface DriverTodayTrip {
  tripCode: string;
  origin: string;
  destination: string;
  status: TripStatus;
  scheduledAt: Date;
}

export interface DriverCompletedTrip {
  id: string;
  origin: string;
  destination: string;
  completedAt: Date;
}
