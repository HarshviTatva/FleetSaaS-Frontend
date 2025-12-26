import { Component, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ROUTE_PATH } from '../../shared/utils/route-path.static';
import { TableColumn } from '../../shared/modules/form-control/interface/table.inteface';
import { ButtonColor, ButtonType } from '../../shared/modules/form-control/common-type/buttontype';
import { primaryColor } from '../../shared/utils/constant.static';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/modules/form-control/components/button/button.component';
import { DynamicTableComponent } from '../../shared/modules/form-control/components/dynamic-table/dynamic-table.component';
import { UserDetailsResponse } from '../company-owner/interfaces/user-account.interface';
// import { UserTableColumns } from '../company-owner/configs/user.config';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-user-account-manage',
  imports: [MaterialModule, ReactiveFormsModule,ButtonComponent,DynamicTableComponent],
  templateUrl: './user-account-manage.component.html',
  styleUrl: './user-account-manage.component.scss',
})
export class UserAccountManageComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialogService = inject(DialogService);

  users = signal<UserDetailsResponse[]>([]);

  columns: any;

  buttonColor: ButtonColor = primaryColor;
  buttonType: ButtonType = 'button';

  addEditUser(value: number) {
    var label;
    if(value==0){
      label = 'Add';
    }
    else{
      label = 'Edit'
    }

  }

  onEdit(driver: any) {
    console.log('Edit', driver);
  }

  onDelete(driver: any) {
    console.log('Delete', driver);
  }

  onPage(event: any) {

  }

  onSort(event: any) {

  }
}
