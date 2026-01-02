import { Component, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { DropdownOption } from '../../interface/select.interface';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';

@Component({
  selector: 'app-select',
  imports: [...MATERIAL_IMPORTS,CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})

export class SelectComponent {
  label = input.required<string>();
  control = input.required<FormControl>();
  dropdownOptions = input.required<DropdownOption[]>();
  customClass = input<string>();
  selectionChanged = output<MatSelectChange>();

  selectionChangeEvent(event: MatSelectChange) {
    this.selectionChanged.emit(event);
  }
}
