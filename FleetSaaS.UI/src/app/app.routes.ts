import { Routes } from '@angular/router';
import { ROUTE_PATH } from './shared/utils/route-path.static';
import { authGuard } from './core/guards/auth.guard';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: ROUTE_PATH.auth.login,
    pathMatch: 'full'
  },

  // Login
  {
    path: ROUTE_PATH.auth.login,
    loadComponent: () =>
      import('./core/auth/components/login/login.component')
        .then(m => m.LoginComponent),
  },

  // Signup
  {
    path: ROUTE_PATH.auth.signup,
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

const dashboardRoutes: Routes = [
  {
    path: ROUTE_PATH.layout.commonlayout,
    canActivate: [authGuard],
    loadComponent: () =>
      import('./module/layout/layout.component')
        .then(m => m.LayoutComponent),
     data: { title: 'Dashboard' },

    children: [
      {
        path: ROUTE_PATH.userAccounts.manage,
        loadComponent: () =>
          import('./module/user-account-manage/user-account-manage.component')
            .then(m => m.UserAccountManageComponent),
      },
      {
        path: ROUTE_PATH.paths.drivers,
        loadComponent: () =>
          import('./module/company-owner/components/driver/driver.component')
            .then(m => m.DriverComponent),
             data: { title: 'Drivers' }
      },
      {
        path: ROUTE_PATH.paths.dispatchers,
        loadComponent: () =>
          import('./module/company-owner/components/dispatcher/dispatcher.component')
            .then(m => m.DispatcherComponent),
             data: { title: 'Dispatchers' }
      },
      // {
      //   path: ROUTE_PATH.paths.dispatchers,
      //   loadComponent: () =>
      //     import('./module/company-owner/components/vehicle/vehicle.component')
      //       .then(m => m.DispatcherComponent),
      //        data: { title: 'Vehicles' }
      // }
    ]
  }
];


export const routes: Routes = [
  { path: '', redirectTo: ROUTE_PATH.auth.login, pathMatch: 'full' },
  ...authRoutes, // auth routes
  ...dashboardRoutes,
  { path: '**', redirectTo: ROUTE_PATH.auth.login }, // fallback route
];
