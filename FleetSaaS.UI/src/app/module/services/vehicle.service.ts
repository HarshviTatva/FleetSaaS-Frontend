import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndPoints } from '../../../environment/environment';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { PagedRequest } from '../../shared/modules/form-control/interface/pagination.interface';
import { HttpService } from '../../shared/services/common/http.service';
import { VehicleRequest, VehicleResponse } from '../vehicle/interface/vehicle.interface';

@Injectable({
  providedIn: 'root',
})

export class VehicleService {
  private readonly httpService = inject(HttpService);
  
   addEditVehicle(vehicleRequest:VehicleRequest):Observable<SuccessResponse<null>>{
      return this.httpService.post<SuccessResponse<null>>(
        apiEndPoints.vehicle.addEditVehicle,
        vehicleRequest
      );
    }

    getAllVehicles(pagedRequest:PagedRequest):Observable<SuccessResponse<VehicleResponse>>{
      return this.httpService.get<SuccessResponse<VehicleResponse>>(
        apiEndPoints.vehicle.getAll,
        { params: pagedRequest as any }
      );
    }

    deleteVehicle(id:string):Observable<SuccessResponse<boolean>>{
      return this.httpService.delete<SuccessResponse<boolean>>(
        apiEndPoints.vehicle.deleteVehicle+'/'+id,
      );
    }
}
