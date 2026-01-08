import { DatePipe } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { ButtonColor, ButtonType } from '../../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../../shared/modules/form-control/components/input/input.component';
import { PagedRequest } from '../../../../../shared/modules/form-control/interface/pagination.interface';
import { DropdownOption } from '../../../../../shared/modules/form-control/interface/select.interface';
import { DialogService } from '../../../../../shared/services/dialog.service';
import { primaryColor, pageSizeOptions } from '../../../../../shared/utils/constant.static';
import { UserRole, StatusList, TripStatus, TripNextStatusMap } from '../../../../../shared/utils/enums/common.enum';
import { CommonService } from '../../../../services/common.service';
import { TripService } from '../../../../services/trip.service';
import { TripHistoryTableColumns, TripTableColumns } from '../../../config/trip.config';
import { Trip, TripResponse } from '../../../interface/trip.interface';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { MATERIAL_IMPORTS } from '../../../../../shared/utils/material.static';
import { TripStatusComponent } from '../trip-status/trip-status.component';

@Component({
  selector: 'app-trip-history',
  imports: [...MATERIAL_IMPORTS, SharedModule],
  templateUrl: './trip-history.component.html',
  styleUrl: './trip-history.component.scss',
})
export class TripHistoryComponent implements OnInit {

  private readonly tripService = inject(TripService);
  private readonly dialogService = inject(DialogService);
  private readonly tokenService = inject(TokenService);
  private readonly commonService = inject(CommonService);
  private readonly datePipe = inject(DatePipe);

  trips = signal<Trip[]>([]);
  columns = TripHistoryTableColumns;

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

  }

  getAllTrips() {
    const pagedRequest: PagedRequest = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.searchControl.value?.trim() || '',
      status: this.statusControl.value ?? 0,
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection(),
      showCompletedRecords: true,
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
    this.getAllTrips();
  }

  onSort(event: Sort) {
    this.sortBy.set(event.active);
    this.sortDirection.set(event.direction || 'asc');
    this.getAllTrips();
  }


  statusChange(trip: Trip) {
    if (!trip.status) return;

    this.dialogService.open(TripNextStatusMap[trip.status] + ' Trip', TripStatusComponent, trip, false).subscribe(
      ((data: boolean) => {
        if (data) {
          this.getAllTrips();
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
