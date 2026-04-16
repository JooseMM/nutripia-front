import { OverlayRef } from '@angular/cdk/overlay';
import { Component, inject, signal } from '@angular/core';
import { CheckIcon, LucideAngularModule, Mail, MailCheck } from 'lucide-angular';
import { Button } from '../../components/button/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../security/authentication';

@Component({
  selector: 'app-resend-email-verification-modal',
  imports: [LucideAngularModule, Button, ReactiveFormsModule],
  templateUrl: './resend-email-verification-modal.html',
  styleUrl: './resend-email-verification-modal.css',
})
export class ResendEmailVerificationModal {
  private readonly authenticationService = inject(AuthenticationService);
  protected readonly isFocus = signal(false);
  protected readonly EMAIL_ICON = Mail;
  protected readonly OKAY_ICON = MailCheck;
  overlayRef?: OverlayRef;

  protected readonly isSended = signal(false);

  protected readonly emailControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  });

  protected get hasErrors(): boolean {
    return (
      this.emailControl.invalid &&
      (this.emailControl.dirty || this.emailControl.touched) &&
      !this.isFocus()
    );
  }

  protected error(): string | undefined {
    const errors = this.emailControl.errors;
    if (!errors) return '';

    if (errors['required']) return 'El correo electrónico es obligatorio';
    if (errors['email']) return 'Ingresa un formato de correo válido';

    return '';
  }

  close(): void {
    this.overlayRef?.dispose();
  }

  protected setFocus(isFocus: boolean): void {
    this.isFocus.set(isFocus);
  }

  protected submit(): void {
    if (this.emailControl.invalid) return;

    this.authenticationService.resendEmailVerification(this.emailControl.value);
    this.isSended.set(true);
    setTimeout(() => this.close(), 5000);
  }
}
