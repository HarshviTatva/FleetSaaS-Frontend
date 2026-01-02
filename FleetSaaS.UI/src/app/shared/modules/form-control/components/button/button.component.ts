import { CommonModule } from '@angular/common';
import { Component, computed, input, Input } from '@angular/core';
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

  @Input() label = 'Submit';
  @Input() color: ButtonColor = 'primary';
  @Input() type: ButtonType = 'button';
  @Input() disabled  = false;

  icon = input<string>('');
  width = input<string>('100%');
  tooltipText = input<string>('');

  buttonStyle = computed(()=>({
    width : this.width()
  }));

}
