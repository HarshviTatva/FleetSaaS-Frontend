import { Component, inject } from '@angular/core';
import { DispatcherService } from '../../../../services/dispatcher.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SuccessResponse } from '../../../../../shared/interfaces/common.interface';
import { SnackbarService } from '../../../../../shared/services/snackbar-service';
import { SharedModule } from '../../../../../shared/modules/shared.module';

@Component({
  selector: 'app-delete-dispatcher',
  imports: [SharedModule],
  templateUrl: './delete-dispatcher.component.html',
  styleUrl: './delete-dispatcher.component.scss',
})
export class DeleteDispatcherComponent {
 private readonly dispatcherService = inject(DispatcherService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly dialogRef = inject(MatDialogRef<any>);

  delete(){
    this.dispatcherService.deleteDispatcher(this.dialogRef.componentInstance.data.data.id).subscribe((response:SuccessResponse<boolean>)=>{
      if(response.result){
        this.snackBarService.success(response.messages[0]);
         this.dialogRef.close(true);
      }
    })
  }
}
