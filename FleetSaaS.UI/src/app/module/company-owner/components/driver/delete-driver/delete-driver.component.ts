import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { DriverService } from '../../../../services/driver.service';
import { SuccessResponse } from '../../../../../interfaces/common.interface';
import { ButtonComponent } from '../../../../../shared/modules/form-control/components/button/button.component';

@Component({
  selector: 'app-delete-driver',
  imports: [ButtonComponent],
  templateUrl: './delete-driver.component.html',
  styleUrl: './delete-driver.component.scss',
})

export class DeleteDriverComponent {
  private readonly driverService = inject(DriverService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<any>);

  delete(){
    this.driverService.deleteDriver(this.dialogRef.componentInstance.data.data.id).subscribe((response:SuccessResponse<boolean>)=>{
      if(response.result){
        this.snackBarService.success(response.messages[0]);
         this.dialogRef.close(true);
      }
    })
  }
}