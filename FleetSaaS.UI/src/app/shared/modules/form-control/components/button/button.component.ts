import { Component, computed, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonColor, ButtonType } from '../../common-type/buttontype';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../material/material.module';

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
  @Input() disabled :boolean = false;

  icon = input<string>('');
  width = input<string>('100%');

  buttonStyle = computed(()=>({
    width : this.width()
  }));

}
