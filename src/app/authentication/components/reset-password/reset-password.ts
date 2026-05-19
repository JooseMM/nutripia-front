import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService, MIN_PASSWORD_LENGTH, PASSWORD_PATTERN } from '../../';
import { AUTHENTICATION_LOADING_KEY } from '../../';
import { CustomInput, passwordMatchValidator } from '../../../shared';
import { Button } from '../../../shared';
import { LucideAngularModule, TriangleAlert, UserRoundPen } from 'lucide-angular';
import { LoadingManager } from '../../../shared';
import { finalize } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { UnexpectedErrorModal } from '../../../shared';
import { createBasicOverlay } from '../../../shared';
import { PasswordReset } from '../../models/password-reset.dto';

@Component({
  selector: 'app-reset-password',
  imports: [CustomInput, ReactiveFormsModule, Button, LucideAngularModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  protected readonly ERROR_ICON = TriangleAlert;
  protected readonly PASSWORD_ICON = UserRoundPen;

  private readonly authenticationService = inject(AuthenticationService);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly loadingManager = inject(LoadingManager);

  private readonly overlay = inject(Overlay);
  private overlayRef!: OverlayRef;

  protected readonly isCompleted = signal(false);
  protected readonly isCodeWrong = signal(false);

  passwordResetToken = input.required<string>();
  protected readonly form = this.fb.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(MIN_PASSWORD_LENGTH),
          Validators.pattern(PASSWORD_PATTERN),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator },
  );

  ngOnInit(): void {
    this.checkToken(this.passwordResetToken());
  }

  protected checkToken(token: string): void {
    this.authenticationService.checkPasswordResetVerificationToken(token).subscribe((isOkay) => {
      this.isCodeWrong.set(!isOkay);
    });
  }

  protected submit(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue();
    const payload: PasswordReset = {
      token: this.passwordResetToken().trim(),
      password: value.password,
    };

    this.loadingManager.showSpinner(AUTHENTICATION_LOADING_KEY);
    this.authenticationService
      .finishPasswordReset(payload)
      .pipe(finalize(() => this.loadingManager.hideSpinner(AUTHENTICATION_LOADING_KEY)))
      .subscribe((isOkay) => {
        if (!isOkay) {
          return this.openUnexpectedErrorModal();
        }

        this.isCompleted.set(true);
      });
  }

  protected openUnexpectedErrorModal() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(UnexpectedErrorModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }
}
