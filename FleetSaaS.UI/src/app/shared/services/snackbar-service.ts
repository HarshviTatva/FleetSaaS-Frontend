import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarDuration } from '../utils/constant.static';

@Injectable({
  providedIn: 'root',
})

export class SnackbarService {
  private readonly _snackBar = inject(MatSnackBar);

  success(message: string) {
    this._snackBar.open(message, 'X', {
      duration: snackBarDuration,
      panelClass: 'success',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  error(message: string) {
    this._snackBar.open(message, 'X', {
      duration: snackBarDuration,
      panelClass: 'error',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  info(message:string){
    this._snackBar.open(message,'X',{
      duration:snackBarDuration,
      panelClass:'info',
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
