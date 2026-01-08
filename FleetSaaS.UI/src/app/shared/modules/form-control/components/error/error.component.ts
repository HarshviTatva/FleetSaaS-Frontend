import { Component, inject, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { ValidationMessages, ValidationService } from '../../../../services/validation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  imports: [
    CommonModule,
    MatError
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  standalone:true
})

export class ErrorComponent {
  control = input<FormControl | null>();
  customMessageList = input<ValidationMessages>({});
  showErrorSpacing = input<boolean | undefined>();

  public validationService = inject(ValidationService);
}
