import { Directive, ElementRef, HostListener, Input, Renderer2, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[appAllowNumberOnly]'
})

export class AllowNumberOnlyDirective implements AfterViewInit {

  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input() maxLength: number | null = null;
  @Input() allowDecimal = false;
  @Input() minNumber: number | null = null;
  @Input() maxNumber: number | null = null;
  @Input() decimalPlaces = 2;

  private inputElement!: HTMLInputElement;


  ngAfterViewInit(): void {
    const native = this.elementRef.nativeElement;
    this.inputElement =
      native.tagName.toLowerCase() === 'input' ? native : native.querySelector('input');
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    const value = this.inputElement?.value || '';
    const isNumber = /^\d$/.test(event.key);
    const isDecimalPoint = event.key === '.';

    // Decimal handling
    if (this.allowDecimal) {
      if (!isNumber && (!isDecimalPoint || value.includes('.'))) {
        return event.preventDefault();
      }
      const [, decimalPart = ''] = value.split('.');
      if (decimalPart.length >= this.decimalPlaces && !this.isSelection()) {
        return event.preventDefault();
      }
    } else if (!isNumber) {
      return event.preventDefault();
    }

    // Max length validation
    if (this.maxLength !== null && value.length >= this.maxLength && !this.isSelection()) {
      return event.preventDefault();
    }
  }

  @HostListener('input')
  onInput(): void {
    let value = this.inputElement?.value || '';
    if (!value || value === '.' || value === '-') return;

    // Trim decimals on paste/overflow
    if (this.allowDecimal && value.includes('.')) {
      const [intPart, decimalPart = ''] = value.split('.');
      if (decimalPart.length > this.decimalPlaces) {
        value = `${intPart}.${decimalPart.substring(0, this.decimalPlaces)}`;
        this.renderer.setProperty(this.inputElement, 'value', value);
      }
    }

    const numericValue = this.allowDecimal ? parseFloat(value) : parseInt(value, 10);
    if (isNaN(numericValue)) return;

    // Clamp to min/max
    if (this.minNumber !== null && numericValue < this.minNumber) {
      this.renderer.setProperty(this.inputElement, 'value', this.minNumber);
    } else if (this.maxNumber !== null && numericValue > this.maxNumber) {
      this.renderer.setProperty(this.inputElement, 'value', this.maxNumber);
    }
  }

  private isSelection(): boolean {
    const { selectionStart, selectionEnd } = this.inputElement || {};
    return selectionStart !== selectionEnd;
  }


}
