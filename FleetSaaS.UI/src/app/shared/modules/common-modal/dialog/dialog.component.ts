import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-dialog',
  imports: 
  [
    MaterialModule, 
    NgComponentOutlet,
    CommonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  standalone:true
})

export class DialogComponent {
  dialogRef = inject(MatDialogRef<DialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  
 close() 
  {
    this.dialogRef.close();
  }

}
