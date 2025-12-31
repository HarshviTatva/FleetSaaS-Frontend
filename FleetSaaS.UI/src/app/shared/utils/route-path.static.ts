export const LAYOUT = 'layout';

export const ROUTE_PATH = {
    AUTH:{
        LOGIN : 'login',
        SIGNUP:'signup'
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
  TRIPS: `${LAYOUT}/trips`,
  VEHICLES: `${LAYOUT}/vehicles`,
  DRIVERS: `${LAYOUT}/drivers`,
  DISPATCHERS: `${LAYOUT}/dispatchers`,
  ASSIGNED_TRIPS: `${LAYOUT}/trips/assigned`,
  TRIP_HISTORY: `${LAYOUT}/trips/history`,
}

