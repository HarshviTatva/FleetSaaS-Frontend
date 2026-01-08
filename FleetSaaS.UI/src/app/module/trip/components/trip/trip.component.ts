import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { DropdownOption } from '../../../../shared/modules/form-control/interface/select.interface';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { DialogService } from '../../../../shared/services/dialog.service';
import { addLabel, editLabel, pageSizeOptions, primaryColor } from '../../../../shared/utils/constant.static';
import { StatusList, TripStatus } from '../../../../shared/utils/enums/common.enum';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { TripService } from '../../../services/trip.service';
import { TripTableColumns } from '../../config/trip.config';
import { Trip, TripResponse } from '../../interface/trip.interface';
import { AssignVehicleDriverToTripComponent } from '../assign-vehicle-driver-to-trip/assign-vehicle-driver-to-trip.component';
import { AddEditTripComponent } from './add-edit-trip/add-edit-trip.component';
import { CancelTripComponent } from './cancel-trip/cancel-trip.component';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-trip',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss',
  standalone:true
})

export class TripComponent implements OnInit {

  private readonly tripService = inject(TripService);
  private readonly dialogService = inject(DialogService);
  private readonly commonService = inject(CommonService);
  private readonly datePipe = inject(DatePipe);

  trips = signal<Trip[]>([]);
  columns = TripTableColumns;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  pageSizeOptions = pageSizeOptions;
  searchControl = new FormControl('');
  statusControl = new FormControl<number | null>(null);
  tripDateControl = new FormControl(null);
  statusList = signal<DropdownOption[]>(StatusList);
  sortBy = signal<string>('id');
  sortDirection = signal<'asc' | 'desc'>('desc');

  searchConfig: InputConfig = {
    key: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Enter Search'
  }

  ngOnInit(): void {
    this.getAllTrips();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(1);
        this.getAllTrips();
      });

    this.statusControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(1);
        this.getAllTrips();
      });

     this.tripDateControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(1);
        this.getAllTrips();
      });
  }

  getAllTrips(data?:number) {
    const pagedRequest: PagedRequest = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.searchControl.value?.trim() || '',
      status: this.statusControl.value??0,
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection(),
       date: this.tripDateControl.value
        ? this.datePipe.transform(this.tripDateControl.value, 'yyyy-MM-dd')!
        : null
    };
    
    this.tripService.getAllTrips(pagedRequest).subscribe({
      next: (response: SuccessResponse<TripResponse>) => {
        this.totalCount.set(response.data.totalCount);
        response.data.trips = response.data.trips.map((data) => ({
          ...data,
          distanceCovered:data.distanceCovered??0,
          statusName: TripStatus[data.status],
          scheduledAtString: this.datePipe.transform(data.scheduledAt, "dd-MM-yyyy, hh:mm a") ?? "--"
        }));
        this.trips.set(response.data.trips ?? []);
        if(data && data>0){
          this.downloadTripCsvFile(pagedRequest);
        }
      }
    });
  }

  addEditTrip(value: Trip | number) {
    this.dialogService.open((value == 0 ? addLabel : editLabel) + ' Trip', AddEditTripComponent, value, true).subscribe(
      ((data: boolean) => {
        if (data) {
          this.getAllTrips();
        }
      })
    );
  }

  onCancel(trip: Trip) {
    this.dialogService
      .open(
        'Cancel Trip',
        CancelTripComponent,
        trip,
        false
      )
      .subscribe((result:boolean) => {
        if (result === true) {
          this.getAllTrips();
        }
      });
  }

  onAssignVehicleDriver(trip: Trip){
    this.dialogService
      .open(
        'Assign Vehicle & Driver',
        AssignVehicleDriverToTripComponent,
        trip,
        false
      )
      .subscribe((result:boolean) => {
        if (result === true) {
          this.getAllTrips();
        }
      });
  }

  onPage(event: PageEvent) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllTrips();
  }

  onSort(event: Sort) {
    this.sortBy.set(event.active);
    this.sortDirection.set(event.direction||'asc');
    this.getAllTrips();
  }

   downloadTripCsvFile(request:PagedRequest) {
    this.tripService.downloadTripCsv(request)
      .subscribe({
        next: (blob: Blob) => {
          this.commonService.downloadFile(blob, 'Trip.csv');
        }
      });
  }

  onDownloadReport(tripDetails:Trip){
    this.tripService.downloadTripDetailedReport(tripDetails.id)
      .subscribe({
        next: (blob: Blob) => {
          this.commonService.downloadFile(blob, `Trip_${tripDetails.name}.pdf`);
        }
      });
  }

}
