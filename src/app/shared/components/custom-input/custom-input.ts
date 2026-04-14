import { Component, computed, forwardRef, input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true,
    },
  ],
})
export class CustomInput implements ControlValueAccessor {
  label = input.required<string>();
  type = input<string>("text");
  placeholder = input('Ingresa la informacion del campo');
  protected readonly id = computed(() => this.label() + new Date().getTime());

  value: string = '';
  disabled = false;

  onChange = (_: string) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      // Link the form control to this class instance
      this.controlDir.valueAccessor = this;
    }
  }

  // Called when the user types
  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  // Called when input loses focus
  onBlur() {
    this.onTouched();
  }

  // Helper signals/methods for the template
  isInvalid() {
    const control = this.controlDir?.control;
    return control ? control.invalid && control.touched : false;
  }

  errorMessage() {
    const errors = this.controlDir?.control?.errors;
    if (errors?.['required']) return `El campo ${this.label} es requerido.`;
    if (errors?.['minlength'])
      return `El campo debe de ser mayor de ${errors['minlength'].requiredLength} caracteres.`;

    throw new Error('Unhandle validation');
  }

  // Angular calls this to set the value
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
