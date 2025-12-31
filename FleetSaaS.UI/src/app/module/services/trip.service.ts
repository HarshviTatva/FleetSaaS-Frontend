import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { PagedRequest } from '../../shared/modules/form-control/interface/pagination.interface';
import { TripRequest, TripResponse } from '../trip/interface/trip.interface';
import { Observable } from 'rxjs';
import { apiEndPoints } from '../../../environment/environment';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { VehicleResponse } from '../vehicle/interface/vehicle.interface';

@Injectable({
  providedIn: 'root',
})

export class TripService {

  private readonly httpService = inject(HttpService);

  addEditTrip(tripRequest: TripRequest): Observable<SuccessResponse<null>> {
    return this.httpService.post<SuccessResponse<null>>(
      apiEndPoints.trip.addEditTrip,
      tripRequest
    );
  }

  getAllTrips(pagedRequest: PagedRequest): Observable<SuccessResponse<TripResponse>> {
    return this.httpService.get<SuccessResponse<TripResponse>>(
      apiEndPoints.trip.getAll,
      { params: pagedRequest as any }
    );
  }
}
