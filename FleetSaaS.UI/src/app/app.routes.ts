import { Routes } from '@angular/router';
import { LAYOUT, ROUTE_PATH } from './shared/utils/route-path.static';
import { authGuard } from './core/guards/auth.guard';
import { UserRole } from './shared/utils/enums/common.enum';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATH.AUTH.LOGIN,
    pathMatch: 'full'
  },

  // Login
  {
    path: ROUTE_PATH.AUTH.LOGIN,
    loadComponent: () =>
      import('./core/auth/components/login/login.component')
        .then(m => m.LoginComponent),
  },

  // Signup
  {
    path: ROUTE_PATH.AUTH.SIGNUP,
    loadComponent: () =>
      import('./core/auth/components/signup/signup.component')
        .then(m => m.SignupComponent),
  },

  //forgot-password
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./core/auth/components/forgot-password/forgot-password.component')
        .then(m => m.ForgotPasswordComponent)
  },
];

const menuRoutes: Routes = [
  {
    path: LAYOUT,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./module/layout/layout.component')
        .then(m => m.LayoutComponent),
    data: { title: 'Dashboard' },

    children: [
      // dashboards
      {
        path: ROUTE_PATH.DASHBOARD.DRIVER_DASHBOARD,
        loadComponent: () =>
          import('./module/dashboards/components/driver-dashboard/driver-dashboard.component')
            .then(m => m.DriverDashboardComponent),
        data: { title: 'Dashboard' }
      },
      {
        path: ROUTE_PATH.DASHBOARD.DISPATCHER_DASHBOARD,
        loadComponent: () =>
          import('./module/dashboards/components/dispatcher-dashboard/dispatcher-dashboard.component')
            .then(m => m.DispatcherDashboardComponent),
        data: { title: 'Dashboard' }
      },
      {
        path: ROUTE_PATH.DASHBOARD.COMPANY_OWNER_DASHBOARD,
        loadComponent: () =>
          import('./module/dashboards/components/company-owner-dashboard/company-owner-dashboard.component')
            .then(m => m.CompanyOwnerDashboardComponent),
        data: { title: 'Dashboard' }
      },

      //other components
      {
        path: ROUTE_PATH.USER_ACCOUNT_MANAGE,
        loadComponent: () =>
          import('./module/user-account-manage/user-account-manage.component')
            .then(m => m.UserAccountManageComponent),
      },
      {
        path: ROUTE_PATH.DRIVERS,
        loadComponent: () =>
          import('./module/company-owner/components/driver/driver.component')
            .then(m => m.DriverComponent),
        data: { title: 'Drivers' }
      },
      {
        path: ROUTE_PATH.DISPATCHERS,
        loadComponent: () =>
          import('./module/company-owner/components/dispatcher/dispatcher.component')
            .then(m => m.DispatcherComponent),
        data: { title: 'Dispatchers' }
      },
      {
        path: ROUTE_PATH.VEHICLES,
        loadComponent: () =>
          import('./module/vehicle/components/vehicle/vehicle.component')
            .then(m => m.VehicleComponent),
        data: { title: 'Vehicles' }
      },
      {
        path: ROUTE_PATH.TRIPS,
        loadComponent: () =>
          import('./module/trip/components/trip/trip.component')
            .then(m => m.TripComponent),
        data: { title: 'Trips' },
      },
      {
          path: ROUTE_PATH.ASSIGNED_TRIPS,
          // canActivate:[authGuard],
          loadComponent: () =>
            import('./module/trip/components/driver-assigned-trips/driver-assigned-trips.component')
              .then(m => m.DriverAssignedTripsComponent),
            data: { title: 'Assigned Trips' }
          }

    ]
  }
];


export const routes: Routes = [
  { path: '', redirectTo: ROUTE_PATH.AUTH.LOGIN, pathMatch: 'full' },
  ...authRoutes, // auth routes
  ...menuRoutes,
  { path: '**', redirectTo: ROUTE_PATH.AUTH.LOGIN }, // fallback route
];
