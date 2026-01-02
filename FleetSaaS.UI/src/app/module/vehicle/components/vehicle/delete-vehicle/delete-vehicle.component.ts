import { Component, inject } from '@angular/core';
import { VehicleService } from '../../../../services/vehicle.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { SharedModule } from '../../../../../shared/modules/shared.module';
import { Vehicle } from '../../../interface/vehicle.interface';

@Component({
  selector: 'app-delete-vehicle',
  imports: [SharedModule],
  templateUrl: './delete-vehicle.component.html',
  styleUrl: './delete-vehicle.component.scss',
})

export class DeleteVehicleComponent {
  private readonly vehicleService = inject(VehicleService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<Vehicle>);

  delete(){
    this.vehicleService.deleteVehicle(this.dialogRef.componentInstance.data.data.id).subscribe((response:SuccessResponse<boolean>)=>{
      if(response.result){
        this.snackBarService.success(response.messages[0]);
         this.dialogRef.close(true);
      }
    })
  }
}
