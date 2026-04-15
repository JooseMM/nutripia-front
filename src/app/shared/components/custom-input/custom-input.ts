import { Component, computed, input, Optional, Self, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput implements ControlValueAccessor {
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input('Ingresa la informacion del campo');
  protected readonly id = computed(() => this.label() + new Date().getTime());

  value: string = '';
  disabled = false;
  focus = signal(false);

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

  onFocus() {
    this.focus.set(true);
  }

  // Called when input loses focus
  onBlur() {
    this.focus.set(false);
    this.onTouched();
  }

  // Helper signals/methods for the template
  isInvalid() {
    const control = this.controlDir?.control;
    return control ? control.invalid && control.touched : false;
  }

  protected errorMessage(): string | undefined {
    const errors = this.controlDir?.control?.errors;

    if (errors?.['required']) return `Campo requerido`;
    if (errors?.['minlength'])
      return `El campo debe tener minimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors?.['maxlength'])
      return `El campo debe tener maximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors?.['email']) return `Formato de email invalido`;
    if (errors?.['passwordMismatch']) return `Las contraseñas no coinciden`;
    if (errors?.['emailAlreadyPresent']) return `El correo electrónico ya se encuentra registrado`;

    return undefined;
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
