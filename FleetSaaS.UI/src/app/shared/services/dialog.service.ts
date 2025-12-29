import { inject, Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../modules/common-modal/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  open(title: string, component: Type<any>,data?:any,showFooter?:boolean) {
    return this.dialog.open(DialogComponent, {
      width: '450px',
      panelClass: 'red-rose-dialog',
      data: { title, component, data, showFooter }
    }).afterClosed();
  }
}
