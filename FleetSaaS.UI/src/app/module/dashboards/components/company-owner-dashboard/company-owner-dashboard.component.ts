import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { SuccessResponse } from '../../../../shared/interfaces/common.interface';
import { CompanyUserDashboardResponse, ExpiryAlertDTO } from '../../interface/dashboard.interface';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/utils/material.static';
import { Router } from '@angular/router';
import { ROUTE_PATH } from '../../../../shared/utils/route-path.static';

@Component({
  standalone: true,
  selector: 'app-company-owner-dashboard',
  imports: [...MATERIAL_IMPORTS,CommonModule],
  templateUrl: './company-owner-dashboard.component.html',
  styleUrl: './company-owner-dashboard.component.scss',
})

export class CompanyOwnerDashboardComponent implements OnInit {

  private readonly dashboardService = inject(DashboardService);
  private readonly route = inject(Router);

  companyUserData = signal<CompanyUserDashboardResponse | null>(null);
  totalFleetPercentage = signal<number>(0);

  ngOnInit(): void {
    this.getDashboardDetails();
  }

  getDashboardDetails() {
    this.dashboardService.getCompanyUserDashboardDetails().subscribe({
      next: (response: SuccessResponse<CompanyUserDashboardResponse>) => {
        this.companyUserData.set(response.data);
        this.totalFleetPercentage.set(
          this.companyUserData() && (this.companyUserData()?.totalVehicleCount??0) > 0
            ? ((this.companyUserData()?.totalActiveVehicleCount??0) / (this.companyUserData()?.totalVehicleCount??0)) * 100
            : 0
        );
      }
    });
  }

  getDaysRemaining(expiryDate: string): number {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getAlertClass(alert: ExpiryAlertDTO): string {
    if (alert.isExpired) return 'error';
    return 'warning';
  }

  getAlertTitle(alert: ExpiryAlertDTO): string {
    if (alert.type === 'VehicleInsurance') {
      return alert.isExpired ? 'Insurance Expired' : 'Insurance Expiring Soon';
    }
    return alert.isExpired ? 'License Expired' : 'License Expiring Soon';
  }

  getAlertDescription(alert: ExpiryAlertDTO): string {
    if (alert.isExpired) {
      return alert.type === 'VehicleInsurance'
        ? 'Vehicle insurance has expired!'
        : 'Driver license has expired!';
    }

    return `${alert.type === 'VehicleInsurance' ? 'Vehicle insurance' : 'Driver license'} expires in ${this.getDaysRemaining(alert.expiryDate)} days`;
  }

  redirectToVehiclePage(){
    this.route.navigate([ROUTE_PATH.LAYOUT_VEHICLES])
  }

  redirectToTripPage(){
    this.route.navigate([ROUTE_PATH.LAYOUT_TRIPS])
  }

}
