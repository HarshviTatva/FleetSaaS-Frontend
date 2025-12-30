import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { Observable } from 'rxjs';
import { apiEndPoints } from '../../../environment/environment';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { UserRequest } from '../company-owner/interfaces/user-account.interface';
import { DriverResponse } from '../company-owner/interfaces/driver.interface';
import { PagedRequest } from '../../shared/modules/form-control/interface/pagination.interface';

@Injectable({
  providedIn: 'root',
})

export class DriverService {
  private readonly httpService = inject(HttpService);
  
   addEditDriverUser(driverUserRequest:UserRequest):Observable<SuccessResponse<null>>{
      return this.httpService.post<SuccessResponse<null>>(
        apiEndPoints.driver.addEditUser,
        driverUserRequest
      );
    }

    getAllDrivers(pagedRequest:PagedRequest):Observable<SuccessResponse<DriverResponse>>{
      return this.httpService.get<SuccessResponse<DriverResponse>>(
        apiEndPoints.driver.getAll,
        { params: pagedRequest as any }
      );
    }

    deleteDriver(id:string):Observable<SuccessResponse<boolean>>{
      return this.httpService.patch<SuccessResponse<boolean>>(
        apiEndPoints.driver.deleteUser+'/'+id,
        null
      );
    }
}
