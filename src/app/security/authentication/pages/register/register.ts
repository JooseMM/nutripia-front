import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../../../shared/components/logo/logo';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';
import { CustomCheckbox } from '../../../../shared/components/custom-checkbox/custom-checkbox';
import {
  LucideAngularModule,
  Dumbbell,
  Leaf,
  Apple,
  Utensils,
  Mail,
  RotateCcw,
} from 'lucide-angular';
import { passwordMatchValidator } from './register.utils';
import {
  AuthenticationService,
  RegisterNutritionist,
  RegistrationResponseState,
  RegistrationStateType,
} from '../..';
import { LoadingSpinner } from '../../../../shared/overlay/loader/components/loading-spinner/loading-spinner';
import { finalize } from 'rxjs';
import { LoadingManager } from '../../../../shared/overlay/loader/services/loading-manager';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    Logo,
    CustomInput,
    ReactiveFormsModule,
    Button,
    CustomCheckbox,
    LucideAngularModule,
    LoadingSpinner,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected readonly DUMBBELL = Dumbbell;
  protected readonly LEAF = Leaf;
  protected readonly APPLE = Apple;
  protected readonly FORKS = Utensils;
  protected readonly MESSAGE = Mail;
  protected readonly RETRY = RotateCcw;
  protected readonly LOADING_KEY = 'registering-user';

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loadingManager = inject(LoadingManager);
  private readonly authenticationService = inject(AuthenticationService);

  private readonly state: WritableSignal<RegistrationStateType | undefined> = signal(undefined);
  protected readonly isComplete = computed(() => this.state() === RegistrationResponseState.Ok);

  protected readonly isLoading = computed(() => this.loadingManager.isLoading(this.LOADING_KEY));

  protected readonly form = this.fb.group(
    {
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      rut: ['', Validators.required],
      birthDate: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          (_: AbstractControl) =>
            this.state() === RegistrationResponseState.EmailAlreadyPresent
              ? { emailAlreadyPresent: true }
              : null,
        ],
      ],
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

    this.loadingManager.showSpinner(this.LOADING_KEY);
    this.authenticationService
      .NutritionistRegister(payload)
      .pipe(finalize(() => this.loadingManager.hideSpinner(this.LOADING_KEY)))
      .subscribe((status) => {
        this.state.set(status);
      });
  }
}
