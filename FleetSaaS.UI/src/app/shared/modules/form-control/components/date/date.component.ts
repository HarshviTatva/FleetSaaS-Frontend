import { Component, computed, effect, input, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date',
  imports: [...MATERIAL_IMPORTS, CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.scss',
})
export class DateComponent {

  label = input.required<string>();
  control = input.required<FormControl<Date | null>>();

  placeholder = input<string>('MM/DD/YYYY');
  appearance = input<'outline' | 'fill'>('outline');
  disabled = input<boolean>(false);
  min = input<Date | null>(null);
  dateChanged = output<Date | null>();

  isDisabled = computed(() =>
    this.disabled() || this.control().disabled
  );

  constructor() {
    effect(() => {
      this.dateChanged.emit(this.control().value);
    });
  }
}
