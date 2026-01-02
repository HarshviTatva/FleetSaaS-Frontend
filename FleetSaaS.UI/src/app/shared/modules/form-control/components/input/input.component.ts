import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../utils/material.static';

export interface InputConfig {
    value?: string;
    key: string;
    label: string;
    type: string;
    readonly?: boolean;
    icon?: string;
    placeholder?: string;
    width?: string;  
    height?:string;
    showErrorSpacing?: boolean;
    min?:number;
    max?:number;
}

@Component({
  selector: 'app-input',
  imports: [MATERIAL_IMPORTS, ReactiveFormsModule, CommonModule,],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone:true
})

export class InputComponent {
  @Input() config!: InputConfig;
  @Input() control!: FormControl;
  @Output() emitClickEvent = new EventEmitter<Event>();
  @Output() inputChangeEvent = new EventEmitter<string>();
  
  onIconClick(event: Event) {
    this.emitClickEvent.emit(event);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.inputChangeEvent.emit(inputElement.value);
  }
}
