import { MenuItem } from "../interfaces/common.interface";
import { DRIVER_TRIPS_MENU, TRIPS_MENU, VEHICLES_MENU, DRIVERS_MENU, DRIVER_TRIP_HISTORY_MENU } from "../utils/constant.static";
import { UserRole } from "../utils/enums/common.enum";
import { ROUTE_PATH } from "../utils/route-path.static";

export const SIDEBAR_MENU: Record<UserRole, MenuItem[]> = {

  [UserRole.Driver]: [
    { label: 'Home', icon: 'dashboard', route: ROUTE_PATH.DRIVER_DASHBOARD },
    DRIVER_TRIPS_MENU,
    DRIVER_TRIP_HISTORY_MENU
  ],

  [UserRole.Dispatcher]: [
    { label: 'Home', icon: 'dashboard', route: ROUTE_PATH.DISPATCHER_DASHBOARD },
    TRIPS_MENU,
    VEHICLES_MENU,
    DRIVERS_MENU
  ],

  [UserRole.CompanyOwner]: [
    { label: 'Home', icon: 'dashboard', route: ROUTE_PATH.COMPANY_OWNER_DASHBOARD },
    TRIPS_MENU,
    VEHICLES_MENU,
    {
      label: 'Accounts',
      icon: 'manage_accounts',
      children: [
        { label: 'Drivers', icon: 'group', route: ROUTE_PATH.DRIVERS },
        { label: 'Dispatchers', icon: 'group', route: ROUTE_PATH.DISPATCHERS }
      ]
    }
  ],

  [UserRole.Admin]:[]

};
