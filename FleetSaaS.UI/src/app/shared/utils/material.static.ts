import { CommonModule, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { CdkTableModule } from '@angular/cdk/table';

export const MATERIAL_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  AsyncPipe,

  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,

  MatTableModule,
  MatPaginatorModule,
  MatSortModule,

  MatSelectModule,
  MatSnackBarModule,
  MatIconModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSlideToggleModule,

  MatSidenavModule,
  MatMenuModule,
  MatChipsModule,
  MatBadgeModule,
  MatListModule,

  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatTabsModule,
  MatStepperModule,

  MatDialogModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDividerModule,

  CdkTableModule,
  MatTimepickerModule
] as const;
