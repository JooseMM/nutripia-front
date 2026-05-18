import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService, MIN_PASSWORD_LENGTH, PASSWORD_PATTERN } from '../../';
import { passwordMatchValidator } from './register.utils';
import {
  AUTHENTICATION_LOADING_KEY,
  RegisterNutritionist,
  RegistrationResponseState,
} from '../../';
import { CustomInput, SendEmailCodeModal } from '../../../shared';
import { Button } from '../../../shared';
import { LucideAngularModule, Mail, RotateCcw } from 'lucide-angular';
import { CustomCheckbox } from '../../../shared';
import { LoadingManager } from '../../../shared';
import { finalize } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UnexpectedErrorModal } from '../../../shared';
import { createBasicOverlay } from '../../../shared';

@Component({
  selector: 'app-register',
  imports: [CustomInput, CustomCheckbox, ReactiveFormsModule, Button, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected readonly MESSAGE = Mail;
  protected readonly RETRY = RotateCcw;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loadingManager = inject(LoadingManager);

  private readonly overlay = inject(Overlay);
  private overlayRef!: OverlayRef;

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
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.pattern(PASSWORD_PATTERN),
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
      .nutritionistRegister(payload)
      .pipe(finalize(() => this.loadingManager.hideSpinner(AUTHENTICATION_LOADING_KEY)))
      .subscribe((status) => {
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
            this.openUnexpectedErrorModal();
            break;
          default:
            throw new Error('Unhandle registration result: ', status);
        }
      });
  }

  protected openResendVerificationModal(): void {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(SendEmailCodeModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }

  protected openUnexpectedErrorModal() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(UnexpectedErrorModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }
}
