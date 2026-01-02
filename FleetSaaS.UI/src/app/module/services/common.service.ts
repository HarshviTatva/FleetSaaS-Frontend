import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { DropdownOption } from '../../shared/modules/form-control/interface/select.interface';
import { apiEndPoints } from '../../shared/utils/api-endpoints.constant';

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  
   private readonly httpService = inject(HttpService);
  
   getVehicleDriverList():Observable<SuccessResponse<DropdownOption[]>>{
         return this.httpService.get<SuccessResponse<DropdownOption[]>>(
           apiEndPoints.common.vehicleDriverList
         );
       }
}
