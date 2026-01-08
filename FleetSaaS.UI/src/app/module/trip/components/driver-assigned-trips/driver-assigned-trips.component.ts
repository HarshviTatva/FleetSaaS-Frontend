import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TokenService } from '../../../../core/auth/services/token.service';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { DropdownOption } from '../../../../shared/modules/form-control/interface/select.interface';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { DialogService } from '../../../../shared/services/dialog.service';
import { pageSizeOptions, primaryColor } from '../../../../shared/utils/constant.static';
import { StatusList, TripNextStatusMap, TripStatus, UserRole } from '../../../../shared/utils/enums/common.enum';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { TripService } from '../../../services/trip.service';
import { TripTableColumns } from '../../config/trip.config';
import { Trip, TripResponse } from '../../interface/trip.interface';
import { TripStatusComponent } from './trip-status/trip-status.component';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-driver-assigned-trips',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './driver-assigned-trips.component.html',
  styleUrl: './driver-assigned-trips.component.scss',
})

export class DriverAssignedTripsComponent implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly dialogService = inject(DialogService);
  private readonly tokenService = inject(TokenService);
  private readonly commonService = inject(CommonService);
  private readonly datePipe = inject(DatePipe);

  trips = signal<Trip[]>([]);
  columns = TripTableColumns;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';
  currentRole = this.tokenService.getUserRoleFromToken() || UserRole.Driver;
  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  pageSizeOptions = pageSizeOptions;
  searchControl = new FormControl('');
  statusControl = new FormControl<number | null>(null);
  statusList = signal<DropdownOption[]>(StatusList);
  sortBy = signal<string>('origin');
  sortDirection = signal<'asc' | 'desc'>('desc');

  searchConfig: InputConfig = {
    key: 'search',
    label: 'Search',
    type: 'text',
    placeholder: 'Enter Search'
  }

  ngOnInit(): void {
    this.getAllAssignedTrips();

    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(1);
        this.getAllAssignedTrips();
      });

    this.statusControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.pageNumber.set(1);
        this.getAllAssignedTrips();
      });
  }

  getAllAssignedTrips() {
    const pagedRequest: PagedRequest = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.searchControl.value?.trim() || '',
      status: this.statusControl.value ?? 0,
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection(),
      date:this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    };

    this.tripService.getAllAssignedTrips(pagedRequest).subscribe({
      next: (response: SuccessResponse<TripResponse>) => {
        this.totalCount.set(response.data.totalCount);
        response.data.trips = response.data.trips.map((data) => ({
          ...data,
          statusName: TripStatus[data.status],
          scheduledAtString: this.datePipe.transform(data.scheduledAt, "dd-MM-yyyy, hh:mm a") ?? "--"
        }));
        this.trips.set(response.data.trips ?? []);
      },
      error: () => {
        this.trips.set([]);
      }
    });
  }

  onPage(event: PageEvent) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllAssignedTrips();
  }

  onSort(event: Sort) {
    this.sortBy.set(event.active);
    this.sortDirection.set(event.direction || 'asc');
    this.getAllAssignedTrips();
  }

  statusChange(trip: Trip) {
    if (!trip.status) return;

    this.dialogService.open(TripNextStatusMap[trip.status] + ' Trip', TripStatusComponent, trip, false).subscribe(
      ((data: boolean) => {
        if (data) {
          this.getAllAssignedTrips();
        }
      })
    );
  }

  onDownloadReport(tripDetails: Trip) {
    this.tripService.downloadTripDetailedReport(tripDetails.id)
      .subscribe({
        next: (blob: Blob) => {
          this.commonService.downloadFile(blob, `Trip_${tripDetails.name}.pdf`);
        }
      });
  }
}
