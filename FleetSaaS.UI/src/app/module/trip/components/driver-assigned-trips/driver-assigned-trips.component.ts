import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { DropdownOption } from '../../../../shared/modules/form-control/interface/select.interface';
import { DialogService } from '../../../../shared/services/dialog.service';
import { primaryColor, pageSizeOptions } from '../../../../shared/utils/constant.static';
import { StatusList, TripStatus } from '../../../../shared/utils/enums/common.enum';
import { TripService } from '../../../services/trip.service';
import { TripTableColumns } from '../../config/trip.config';
import { Trip, TripResponse } from '../../interface/trip.interface';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-driver-assigned-trips',
  imports: [...MATERIAL_IMPORTS,SharedModule],
  templateUrl: './driver-assigned-trips.component.html',
  styleUrl: './driver-assigned-trips.component.scss',
})

export class DriverAssignedTripsComponent {
 private readonly tripService = inject(TripService);
  private readonly dialogService = inject(DialogService);
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
      status: this.statusControl.value??0,
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()
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
    this.sortDirection.set(event.direction||'asc');
    this.getAllAssignedTrips();
  }

}
