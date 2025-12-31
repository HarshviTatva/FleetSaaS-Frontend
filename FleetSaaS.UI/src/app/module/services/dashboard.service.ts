import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { Vehicle } from '../vehicle/interface/vehicle.interface';
import { apiEndPoints } from '../../../environment/environment';

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
}
