import { Component, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication-service';
import { passwordMatchValidator } from './register.utils';
import {
  AUTHENTICATION_LOADING_KEY,
  RegisterNutritionist,
  RegistrationResponseState,
} from '../../../..';
import { CustomInput } from '../../../../../../shared/components/custom-input/custom-input';
import { Button } from '../../../../../../shared/components/button/button';
import { LucideAngularModule, Mail, RotateCcw } from 'lucide-angular';
import { CustomCheckbox } from '../../../../../../shared/components/custom-checkbox/custom-checkbox';
import { LoadingManager } from '../../../../../../shared/overlay/loader/services/loading-manager';
import { finalize } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    CustomInput,
    CustomCheckbox,
    ReactiveFormsModule,
    Button,
    LucideAngularModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected readonly MESSAGE = Mail;
  protected readonly RETRY = RotateCcw;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loadingManager = inject(LoadingManager);

  protected readonly isCompleted = signal(false);

  protected readonly form = this.fb.group(
    {
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      rut: ['', Validators.required],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      acceptTerm: [false, Validators.requiredTrue],
    },
    { validators: passwordMatchValidator },
  );

  protected submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    const payload: RegisterNutritionist = {
      firstname: value.firstname.trim().toLowerCase(),
      lastname: value.lastname.trim().toLowerCase(),
      birthDate: value.birthDate,
      emailAddress: value.email.trim(),
      password: value.password,
      rut: value.rut.trim().toLowerCase(),
    };

    this.loadingManager.showSpinner(AUTHENTICATION_LOADING_KEY);
    this.authenticationService
      .NutritionistRegister(payload)
      .pipe(finalize(() => this.loadingManager.hideSpinner(AUTHENTICATION_LOADING_KEY)))
      .subscribe((status) => {
        console.log(status);
        switch (status) {
          case RegistrationResponseState.Ok:
            this.isCompleted.set(true);
            break;
          case RegistrationResponseState.EmailAlreadyPresent:
            this.isCompleted.set(false);
            this.form.get('email')?.setErrors({ emailAlreadyPresent: true });
            break;
          case RegistrationResponseState.UnexpectedError:
          case RegistrationResponseState.ValidationError:
            this.isCompleted.set(false);
            break;
          default:
            throw new Error('Unhandle registration result: ', status);
        }
      });
  }
}
