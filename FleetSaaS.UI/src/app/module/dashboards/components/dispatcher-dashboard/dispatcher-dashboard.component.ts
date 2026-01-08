import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { DialogService } from '../../../../shared/services/dialog.service';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { DashboardService } from '../../../services/dashboard.service';
import { AssignVehicleDriverToTripComponent } from '../../../trip/components/assign-vehicle-driver-to-trip/assign-vehicle-driver-to-trip.component';
import { DispatcherDashboardResponse, UpcomingTripDTO } from '../../interface/dashboard.interface';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';

@Component({
  selector: 'app-dispatcher-dashboard',
  imports: [...MATERIAL_IMPORTS,CommonModule,SharedModule],
  templateUrl: './dispatcher-dashboard.component.html',
  styleUrl: './dispatcher-dashboard.component.scss',
})
export class DispatcherDashboardComponent implements OnInit {

 private readonly dashboardService = inject(DashboardService);
 private readonly dialogService = inject(DialogService);
 private readonly route = inject(Router);

 dashboardData = signal<DispatcherDashboardResponse | null>(null);

  ngOnInit(): void {
    this.getDispatcherDashboardDetails();
  }

  getDispatcherDashboardDetails(){
    this.dashboardService.getDispatcherDashboardDetails().subscribe({
    next: (response: SuccessResponse<DispatcherDashboardResponse>) => {
      this.dashboardData.set(response.data);
    }
  });
  }

  redirectToDriverPage(){
    this.route.navigate([ROUTE_PATH.LAYOUT_DRIVERS]);
  }

  redirectToTripsPage(){
    this.route.navigate([ROUTE_PATH.LAYOUT_TRIPS]);
  }

   onAssignVehicleDriver(trip: UpcomingTripDTO){
      this.dialogService
        .open(
          'Assign Vehicle & Driver',
          AssignVehicleDriverToTripComponent,
          trip,
          false
        )
        .subscribe((result:boolean) => {
          if (result === true) {
            this.getDispatcherDashboardDetails();
          }
        });
    }
}
