import { MenuItem } from "../interfaces/common.interface";
import { UserRole } from "../utils/enums/common.enum";

export const SIDEBAR_MENU: Record<number, MenuItem[]> = {

  [UserRole.Driver]: [
    { label: 'Home', icon: 'dashboard', route: '/dashboard' },
    {
      label: 'Trips',
      icon: 'travel_luggage_and_bags',
      children: [
        { label: 'Assigned Trips', route: '/layout/trips/assigned' },
        { label: 'Trip History', route: '/layout/trips/history' }
      ]
    },
    { label: 'My Vehicles', icon: 'delivery_truck_speed', route: '/layout/my-vehicles' },
  ],

   [UserRole.Dispatcher]: [
    { label: 'Home', icon: 'dashboard', route: '/dashboard' },
    { label: 'Trips', icon: 'travel_luggage_and_bags', route: '/layout/trips' },
    { label: 'Vehicles', icon: 'delivery_truck_speed' , route: '/layout/vehicles' },
    { label: 'Drivers', icon: 'group', route: '/layout/drivers' },
  ],

  [UserRole.CompanyOwner]: [
    { label: 'Home', icon: 'dashboard', route: '/dashboard' },
    { label: 'Trips', icon: 'travel_luggage_and_bags', route: '/layout/trips' },
    { label: 'Vehicles', icon: 'delivery_truck_speed', route: '/layout/vehicles' },
    { label: 'Reports', icon: 'analytics', route: '/reports' },
    {
      label: 'Accounts',
      icon: 'manage_accounts',
      children: [
        { label: 'Drivers', route: '/layout/drivers' },
        { label: 'Dispatchers', route: '/layout/dispatchers' }
      ]
    },
  ]
};
