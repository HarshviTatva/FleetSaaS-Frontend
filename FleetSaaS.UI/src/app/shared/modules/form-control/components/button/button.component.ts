import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ButtonColor, ButtonType } from '../../common-type/buttontype';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';

@Component({
  selector: 'app-button',
  imports: [...MATERIAL_IMPORTS, CommonModule],
  standalone:true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {

  label = input<string>('Submit');
  color = input<ButtonColor>('primary');
  type = input<ButtonType>('button');
  disabled = input<boolean>(false);
  icon = input<string>('');
  width = input<string>('100%');
  tooltipText = input<string>('');

  buttonStyle = computed(()=>({
    width : this.width()
  }));

}
