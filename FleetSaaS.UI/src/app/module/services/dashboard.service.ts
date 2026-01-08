import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { Vehicle } from '../vehicle/interface/vehicle.interface';
import { apiEndPoints } from '../../shared/utils/api-endpoints.constant';
import { CompanyUserDashboardResponse, DispatcherDashboardResponse, DriverDashboardResponse } from '../dashboards/interface/dashboard.interface';

@Injectable({
  providedIn: 'root',
})

export class DashboardService {
    private readonly httpService = inject(HttpService);

    getAssignedVehicleInformation():Observable<SuccessResponse<Vehicle>>{
      return this.httpService.get<SuccessResponse<Vehicle>>(
        apiEndPoints.dashboard.assignedVehicle
      );
    }

    getCompanyUserDashboardDetails():Observable<SuccessResponse<CompanyUserDashboardResponse>>{
      return this.httpService.get<SuccessResponse<CompanyUserDashboardResponse>>(
        apiEndPoints.dashboard.companyUserDashboard
      );
    }

    getDispatcherDashboardDetails():Observable<SuccessResponse<DispatcherDashboardResponse>>{
      return this.httpService.get<SuccessResponse<DispatcherDashboardResponse>>(
        apiEndPoints.dashboard.dispatcherDashboard
      );
    }

    getDriverDashboardDetails():Observable<SuccessResponse<DriverDashboardResponse>>{
      return this.httpService.get<SuccessResponse<DriverDashboardResponse>>(
        apiEndPoints.dashboard.driverDashboard
      );
    }
}
