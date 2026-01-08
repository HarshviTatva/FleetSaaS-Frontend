export const LAYOUT = 'layout';

export const ROUTE_PATH = {
    AUTH:{
        LOGIN : 'login',
        SIGNUP:'signup',
        FORGOT_PASSWORD:'forgot-password',
        RESET_PASSWORD:'reset-password'
    },
    PATHS:{
        DRIVERS:'drivers',
        DISPATCHERS:'dispatchers'
    },
    USER_ACCOUNT_MANAGE:'user-management',
    DASHBOARD:{
        DRIVER_DASHBOARD:'driver-dashboard',
        DISPATCHER_DASHBOARD:'dispatcher-dashboard',
        COMPANY_OWNER_DASHBOARD:'company-owner-dashboard'
    },
  DRIVER_DASHBOARD: `${LAYOUT}/driver-dashboard`,
  DISPATCHER_DASHBOARD: `${LAYOUT}/dispatcher-dashboard`,
  COMPANY_OWNER_DASHBOARD: `${LAYOUT}/company-owner-dashboard`,
  TRIPS: `trips`,
  VEHICLES: `vehicles`,
  DRIVERS: `drivers`,
  DISPATCHERS: `dispatchers`,
  ASSIGNED_TRIPS:`assigned-trips`,
  TRIP_HISTORY:`trip-history`,
  LAYOUT_TRIPS: `${LAYOUT}/trips`,
  LAYOUT_VEHICLES: `${LAYOUT}/vehicles`,
  LAYOUT_DRIVERS: `${LAYOUT}/drivers`,
  LAYOUT_ASSIGNED_TRIPS:`${LAYOUT}/assigned-trips`,
  USER_PROFILE:`user-profile`
}

