import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';
import { DashboardService } from '../../../services/dashboard.service';
import { ErrorResponse, SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { Vehicle } from '../../../vehicle/interface/vehicle.interface';
import { SnackbarService } from '../../../../shared/services/snackbar-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-driver-dashboard',
  imports: [MaterialModule,DatePipe],
  templateUrl: './driver-dashboard.component.html',
  styleUrl: './driver-dashboard.component.scss',
})

export class DriverDashboardComponent implements OnInit{

  private readonly dashboardService = inject(DashboardService);
  private readonly snackbarService = inject(SnackbarService);

  vehicleDetails = signal<Vehicle | null>(null);

  ngOnInit(): void {
    this.getVehicleInformation();
  }

  getVehicleInformation(){
    this.dashboardService.getAssignedVehicleInformation().subscribe({
      next:(response:SuccessResponse<Vehicle>)=>{
        this.vehicleDetails.set(response.data);
      },
      error:(error:ErrorResponse)=>{
        this.snackbarService.error(error.messages[0]);
      }
    });
  }
}
