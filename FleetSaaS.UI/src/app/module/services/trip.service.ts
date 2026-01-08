import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/common/http.service';
import { PagedRequest } from '../../shared/modules/form-control/interface/pagination.interface';
import { CancelTripRequest, TripAssignmentRequest, TripRequest, TripResponse } from '../trip/interface/trip.interface';
import { Observable } from 'rxjs';
import { SuccessResponse } from '../../shared/interfaces/common.interface';
import { apiEndPoints } from '../../shared/utils/api-endpoints.constant';

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

  cancelTrip(cancelTripRequest: CancelTripRequest): Observable<SuccessResponse<boolean>> {
    return this.httpService.patch<SuccessResponse<boolean>>(
      apiEndPoints.trip.cancelTrip,
      cancelTripRequest
    );
  }

   changeTripStatus(id: string,status?:number,distanceCovered?:number): Observable<SuccessResponse<boolean>> {
    return this.httpService.patch<SuccessResponse<boolean>>(
      apiEndPoints.trip.tripStatus + '/' + id + '/' + status,
      {distanceCovered}
    );
  }

  assignDriverToTrip(assignRequest: TripAssignmentRequest): Observable<SuccessResponse<string>> {
    return this.httpService.post<SuccessResponse<string>>(
      apiEndPoints.trip.assignDriver,
      assignRequest
    );
  }

  unAssignDriverToTrip(tripId: string): Observable<SuccessResponse<string>> {
    return this.httpService.patch<SuccessResponse<string>>(
      apiEndPoints.trip.unAssignDriver + '/' + tripId,
      null
    );
  }

  getAllAssignedTrips(pagedRequest:PagedRequest): Observable<SuccessResponse<TripResponse>> {
    return this.httpService.get<SuccessResponse<TripResponse>>(
      apiEndPoints.trip.assignedTrips,
      { params: pagedRequest as any }
    );
  }

   downloadTripCsv(request: PagedRequest) {
    return this.httpService.download(
      apiEndPoints.trip.downloadTripCsv,
      request
    );
  }

  downloadTripDetailedReport(tripId:string) {
    return this.httpService.downloadReport(
      apiEndPoints.trip.downloadReport+tripId
    );
  }
}
