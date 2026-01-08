import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';

@Component({
  selector: 'app-text-area',
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  standalone:true
})
export class TextAreaComponent {

  label = input.required<string>();
  placeholder = input<string>('');
  rows = input<number>(4);
  maxLength = input<number>();
  control = input.required<FormControl>();

}
