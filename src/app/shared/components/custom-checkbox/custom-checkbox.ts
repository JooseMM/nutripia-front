import { Component, input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-checkbox',
  imports: [],
  templateUrl: './custom-checkbox.html',
  styleUrl: './custom-checkbox.css',
})
export class CustomCheckbox {
  label = input.required<string>();

  value = false;
  disabled = false;

  onChange = (_: boolean) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) this.controlDir.valueAccessor = this;
  }

  onToggle(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.value = checked;
    this.onChange(checked);
  }

  writeValue(val: boolean): void {
    this.value = val;
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
