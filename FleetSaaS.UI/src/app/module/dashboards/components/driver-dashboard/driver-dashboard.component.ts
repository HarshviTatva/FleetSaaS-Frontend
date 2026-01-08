import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { TripStatus, TripStatusLabelMap } from '../../../../shared/utils/enums/common.enum';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { DashboardService } from '../../../services/dashboard.service';
import { Vehicle } from '../../../vehicle/interface/vehicle.interface';
import { DriverDashboardResponse } from '../../interface/dashboard.interface';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-dashboard',
  imports: [...MATERIAL_IMPORTS,DatePipe],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.scss',
})

export class DriverDashboardComponent implements OnInit{

  private readonly dashboardService = inject(DashboardService);
  private readonly route = inject(Router);
  
  driverData = signal<DriverDashboardResponse | null>(null);
  vehicleDetails = signal<Vehicle | null>(null);

  ngOnInit(): void {
    this.getDriverDashboardDetails();
    this.getVehicleInformation();
  }

  getVehicleInformation(){
    this.dashboardService.getAssignedVehicleInformation().subscribe({
      next:(response:SuccessResponse<Vehicle>)=>{
        this.vehicleDetails.set(response.data);
      }
    });
  }

  getDriverDashboardDetails(){
      this.dashboardService.getDriverDashboardDetails().subscribe({
      next:(response:SuccessResponse<DriverDashboardResponse>)=>{
        this.driverData.set(response.data);
      }
    });
  }

  getTripStatusLabel(status: TripStatus): string {
  return TripStatusLabelMap[status] ?? 'Unknown';
  }

  redirectPagetoTrips(){
      this.route.navigate([ROUTE_PATH.LAYOUT_ASSIGNED_TRIPS]);
  }
}
