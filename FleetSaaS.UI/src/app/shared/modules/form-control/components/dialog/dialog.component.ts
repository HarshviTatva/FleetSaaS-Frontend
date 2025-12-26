import { Component, inject, Inject } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../../../../material/material.module';

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

 constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

 close() 
  {
    this.dialogRef.close();
  }

}
