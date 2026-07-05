import { NgStyle } from '@angular/common';
import {
  Component,
  computed,
  input,
  OnDestroy,
  OnInit,
  Optional,
  output,
  Self,
  signal,
  WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import { map, Subject } from 'rxjs';

@Component({
  selector: 'app-custom-input',
  imports: [NgStyle],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput implements ControlValueAccessor, OnInit, OnDestroy {
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input('Ingresa la informacion del campo');
  customStyles = input<Record<string, string>>({});
  onSubmit = output<void>();

  private readonly $destroy = new Subject<void>();
  protected readonly id = computed(() => this.label() + new Date().getTime());

  protected value: string = '';
  protected disabled = false;
  protected focus = signal(false);
  protected invalid = signal(false);
  protected errorMessage: WritableSignal<string | undefined> = signal(undefined);

  onChange = (_: string) => {};
  onTouched = () => {};

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    this.controlDir?.statusChanges
      ?.pipe(map((status) => status === 'INVALID'))
      .subscribe((isInvalid) => {
        this.errorMessage.set(this.extractErrorMessage(this.controlDir?.control?.errors));
        this.invalid.set(isInvalid);
      });
  }

  submit() {
    this.onSubmit.emit();
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

  protected extractErrorMessage(
    errorList: ValidationErrors | null | undefined,
  ): string | undefined {
    if (errorList?.['required']) return `Campo requerido`;
    if (errorList?.['minlength'])
      return `Debe tener minimo ${errorList['minlength'].requiredLength} caracteres`;
    if (errorList?.['maxlength'])
      return `Debe tener maximo ${errorList['maxlength'].requiredLength} caracteres`;
    if (errorList?.['email']) return `Formato de email invalido`;
    if (errorList?.['passwordMismatch']) return `Las contraseñas no coinciden`;
    if (errorList?.['emailAlreadyPresent']) return `Correo electrónico ya registrado`;
    if (errorList?.['wrongCredentials']) return `Credenciales incorrectas`;

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

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
