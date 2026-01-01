import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { PagedRequest } from '../../shared/modules/form-control/interface/pagination.interface';
import { HttpService } from '../../shared/services/common/http.service';
import { VehicleRequest, VehicleResponse } from '../vehicle/interface/vehicle.interface';
import { DropdownOption } from '../../shared/modules/form-control/interface/select.interface';
import { VehicleAssignmentRequest } from '../company-owner/interfaces/driver.interface';
import { apiEndPoints } from '../../shared/utils/api-endpoints.constant';

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
      return this.httpService.patch<SuccessResponse<boolean>>(
        apiEndPoints.vehicle.deleteVehicle+'/'+id,
        null
      );
    }

    getVehicleList():Observable<SuccessResponse<DropdownOption[]>>{
      return this.httpService.get<SuccessResponse<DropdownOption[]>>(
        apiEndPoints.vehicle.vehicleList
      );
    }

    assignVehicleToDriver(assignVehicleRequest: VehicleAssignmentRequest):Observable<SuccessResponse<string>>{
      return this.httpService.post<SuccessResponse<string>>(
        apiEndPoints.vehicle.assignVehicle,
        assignVehicleRequest
      );
    }

    reAssignVehicleToDriver(assignVehicleRequest: VehicleAssignmentRequest):Observable<SuccessResponse<string>>{
      return this.httpService.patch<SuccessResponse<string>>(
        apiEndPoints.vehicle.reAssignVehicle+'/'+assignVehicleRequest.id,
        assignVehicleRequest
      );
    }

     unAssignVehicleToDriver(id:string):Observable<SuccessResponse<string>>{
      return this.httpService.patch<SuccessResponse<string>>(
        apiEndPoints.vehicle.unAssignVehicle+'/'+id,
        null
      );
    }
}
