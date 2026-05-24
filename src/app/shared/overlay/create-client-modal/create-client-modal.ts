import { OverlayRef } from '@angular/cdk/overlay';
import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule, Mail, MailCheck, X } from 'lucide-angular';
import { Button } from '../../components/button/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService, EmailAddress } from '../../../nutritionist';
import { VerificationCodeUsage, VerificationCodeUsageType } from '../overlay.utils';

@Component({
  selector: 'app-create-client-modal',
  imports: [LucideAngularModule, Button, ReactiveFormsModule],
  templateUrl: './create-client-modal.html',
  styleUrl: './create-client-modal.css',
})
export class CreateClientModal {
  private readonly authenticationService = inject(AuthenticationService);
  protected readonly isFocus = signal(false);

  protected readonly EMAIL_ICON = Mail;
  protected readonly CLOSE_ICON = X;
  protected readonly OKAY_ICON = MailCheck;
  protected readonly USAGE_TYPE = VerificationCodeUsage;

  usage: VerificationCodeUsageType = this.USAGE_TYPE.VerifyEmail;
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
    console.log(this.usage);

    const payload: EmailAddress = {
      emailAddress: this.emailControl.value,
    };

    switch (this.usage) {
      case this.USAGE_TYPE.ResetPassword:
        this.authenticationService.startPasswordReset(payload).subscribe();
        break;
      case this.USAGE_TYPE.VerifyEmail:
        this.authenticationService.resendEmailVerification(payload).subscribe();
        break;
      default:
        throw new Error('Unhandle usage: ', this.usage);
    }

    this.isSended.set(true);
  }
}
