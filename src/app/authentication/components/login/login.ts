import { Component, inject } from '@angular/core';
import {
  Button,
  createBasicOverlay,
  CustomInput,
  LoadingManager,
  SendEmailCodeModal,
  VerificationCodeUsage,
  UnexpectedErrorModal,
} from '../../../shared';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AUTHENTICATION_LOADING_KEY, MIN_PASSWORD_LENGTH, PASSWORD_PATTERN } from '../..';
import { LoginRequestDto } from '../../models/login.dto';
import { AuthenticationService } from '../..';
import { finalize } from 'rxjs';
import { LoginResponseState } from '../..';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LucideAngularModule } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CustomInput, Button, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly loadingManager = inject(LoadingManager);
  private readonly router = inject(Router);

  private readonly overlay = inject(Overlay);
  private overlayRef!: OverlayRef;

  protected readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(MIN_PASSWORD_LENGTH),
        Validators.pattern(PASSWORD_PATTERN),
      ],
    ],
  });

  protected openUnexpectedErrorModal() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(UnexpectedErrorModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }

  protected openResetPasswordModal(): void {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(SendEmailCodeModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.usage = VerificationCodeUsage.ResetPassword;
    componentRef.instance.overlayRef = this.overlayRef;
  }

  protected submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    const payload: LoginRequestDto = {
      emailAddress: value.email.trim(),
      password: value.password,
    };

    this.loadingManager.showSpinner(AUTHENTICATION_LOADING_KEY);
    this.authenticationService
      .nutritionistLogin(payload)
      .pipe(finalize(() => this.loadingManager.hideSpinner(AUTHENTICATION_LOADING_KEY)))
      .subscribe((status) => {
        switch (status) {
          case LoginResponseState.WrongCredentials:
            this.form.get('password')?.setErrors({ wrongCredentials: true });
            break;
          case LoginResponseState.UnexpectedError:
            this.openUnexpectedErrorModal();
            break;
          case LoginResponseState.Ok:
            this.router.navigate(['dashboard']);
            break;
        }
      });
  }
}
