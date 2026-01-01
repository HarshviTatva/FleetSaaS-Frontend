import { CommonModule } from '@angular/common';
import { Component, computed, input, Input } from '@angular/core';
import { MaterialModule } from '../../../../material/material.module';
import { ButtonColor, ButtonType } from '../../common-type/buttontype';

@Component({
  selector: 'app-button',
  imports: [MaterialModule, CommonModule],
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
