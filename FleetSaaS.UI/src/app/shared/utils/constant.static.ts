import { MenuItem } from "../interfaces/common.interface";
import { ROUTE_PATH } from "./route-path.static";

export const snackBarDuration = 5000;
export const primaryColor = 'primary';
export const pageSizeOptions = [5, 10, 25];
export const licenseNumberRegex = '^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$';
export const licensePlateRegex ='^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$';
export const vinRegex = '^[A-HJ-NPR-Z0-9]{17}$';
export const editLabel = 'Update';
export const addLabel = 'Add';
export const assignLabel = 'Assign ';
export const reAssignLabel = 'Re-Assign ';
export const unAssignLabel = 'Un-Assign ';

export const fields = {
    email: 'email',
    licenseNumber: "licenseNumber",
    vin: "vin",
    licensePlate: "licensePlate"
}

export const TRIPS_MENU: MenuItem = {
  label: 'Trips',
  icon: 'travel_luggage_and_bags',
  route: ROUTE_PATH.TRIPS
};

export const VEHICLES_MENU: MenuItem = {
  label: 'Vehicles',
  icon: 'delivery_truck_speed',
  route: ROUTE_PATH.VEHICLES
};

export const DRIVERS_MENU: MenuItem = {
  label: 'Drivers',
  icon: 'group',
  route: ROUTE_PATH.DRIVERS
};

export const DRIVER_TRIPS_MENU: MenuItem = {
  label: 'Trips',
  icon: 'travel_luggage_and_bags',
  children: [
    { label: 'Assigned Trips', icon:'local_taxi', route: ROUTE_PATH.ASSIGNED_TRIPS },
    { label: 'Trip History', icon:'history', route: ROUTE_PATH.TRIP_HISTORY }
  ]
};