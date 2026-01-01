import { Component, inject, OnInit, signal } from '@angular/core';
import { TripService } from '../../../services/trip.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { DatePipe } from '@angular/common';
import { MaterialModule } from '../../../../shared/material/material.module';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { Trip, TripResponse } from '../../interface/trip.interface';
import { TripTableColumns } from '../../config/trip.config';
import { FormControl } from '@angular/forms';
import { ButtonColor, ButtonType } from '../../../../shared/modules/form-control/common-type/buttontype';
import { addLabel, editLabel, primaryColor } from '../../../../shared/utils/constant.static';
import { PagedRequest } from '../../../../shared/modules/form-control/interface/pagination.interface';
import { AddEditTripComponent } from './add-edit-trip/add-edit-trip.component';
import { InputConfig } from '../../../../shared/modules/form-control/components/input/input.component';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { StatusList, TripStatus } from '../../../../shared/utils/enums/common.enum';
import { DropdownOption } from '../../../../shared/modules/form-control/interface/select.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-trip',
  imports: [MaterialModule, SharedModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss',
})

export class TripComponent implements OnInit {

  private readonly tripService = inject(TripService);
  private readonly dialogService = inject(DialogService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly datePipe = inject(DatePipe);

  trips = signal<Trip[]>([]);
  columns = TripTableColumns;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  pageNumber = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

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
      status: this.statusControl.value??0,
      sortBy: this.sortBy(),
      sortDirection: this.sortDirection()
    };
    
    this.tripService.getAllTrips(pagedRequest).subscribe({
      next: (response: SuccessResponse<TripResponse>) => {
        response.data.trips = response.data.trips.map((data) => ({
          ...data,
          statusName: TripStatus[data.status],
          scheduledAtString: this.datePipe.transform(data.scheduledAt, "dd-MM-yyyy, hh:mm a") ?? "--"
        }));
        this.trips.set(response.data.trips ?? []);
      },
      error: (error) => {
        this.snackBarService.error(error.messages[0]);
        this.trips.set([]);
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

  onCancel(trip: Trip | number) {
    // this.dialogService
    //   .open(
    //     'Delete Vehicle',
    //     DeleteVehicleComponent,
    //     vehicle,
    //     false
    //   )
    //   .subscribe((result) => {
    //     if (result === true) {
    //       this.getAllVehicles();
    //     }
    //   });
  }

  onPage(event: any) {
    this.pageNumber.set(event.pageIndex + 1);
    this.pageSize.set(event.pageSize);
    this.getAllTrips();
  }

  onSort(event: any) {
    this.sortBy.set(event.sortBy);
    this.sortDirection.set(event.direction);
    this.getAllTrips();
  }


}
