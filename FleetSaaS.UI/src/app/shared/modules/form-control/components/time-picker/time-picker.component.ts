import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';

@Component({
  selector: 'app-time-picker',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
  standalone: true
})
export class TimePickerComponent {

  label = input<string>('Time');
  control = input.required<FormControl>();
  disabled = input<boolean>(false);

}
