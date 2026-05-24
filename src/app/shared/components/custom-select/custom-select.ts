import { Component, computed, input, Optional, Self, signal } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  imports: [],
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.css',
})
export class CustomSelect implements ControlValueAccessor {
  label = input.required<string>();
  options = input<{ id: number; value: string }[]>([]);
  placeholder = input('Ingresa la informacion del campo');
  protected readonly id = computed(() => this.label() + new Date().getTime());

  value: string = '';
  disabled = false;
  focus = signal(false);

  onChange = (_: string) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) this.controlDir.valueAccessor = this;
  }

  onSelect(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
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
