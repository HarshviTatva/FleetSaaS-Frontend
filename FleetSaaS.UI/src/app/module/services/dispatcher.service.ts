import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { Observable } from 'rxjs';
import { apiEndPoints } from '../../../environment/environment';
import { SuccessResponse } from '../../interfaces/common.interface';
import { UserRequest } from '../company-owner/interfaces/user-account.interface';
import { DispatcherResponse } from '../company-owner/interfaces/dispatcher.interface';
import { PagedRequest } from '../../shared/modules/form-control/interface/pagination.interface';

@Injectable({
  providedIn: 'root',
})

export class DispatcherService {

  private readonly httpService = inject(HttpService);  

    addEditDispatcherUser(dispatchUserRequest:UserRequest):Observable<SuccessResponse<null>>{
      return this.httpService.post<SuccessResponse<null>>(
        apiEndPoints.dispatcher.addEditUser,
        dispatchUserRequest
      );
    }

    getAllDispatchers(pagedRequest:PagedRequest):Observable<SuccessResponse<DispatcherResponse>>{
      return this.httpService.get<SuccessResponse<DispatcherResponse>>(
        apiEndPoints.dispatcher.getAll,
         { params: pagedRequest as any }
      );
    }

    deleteDispatcher(id:string):Observable<SuccessResponse<boolean>>{
      return this.httpService.delete<SuccessResponse<boolean>>(
        apiEndPoints.dispatcher.deleteUser+'/'+id,

      );
    }
}
