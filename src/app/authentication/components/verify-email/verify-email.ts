import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { Button, LoadingManager, UnexpectedErrorModal } from '../../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import {
  AUTHENTICATION_LOADING_KEY,
  AuthenticationService,
  EmailVerificationResponseState,
  Token,
} from '../..';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SendEmailCodeModal } from '../../../shared';
import { createBasicOverlay } from '../../../shared';
import { MailCheck, LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  selector: 'app-verify-email',
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly loadingManager = inject(LoadingManager);
  protected readonly OKAY_ICON = MailCheck;
  protected readonly FAILURE_ICON = TriangleAlert;

  private readonly overlay = inject(Overlay);
  private overlayRef!: OverlayRef;

  private readonly subscriptionRef = new Subscription();

  protected readonly isCodeWrong = signal(false);
  protected readonly timeleft = signal(0);
  private intervalId: number | undefined;
  verificationToken = input.required<string>();

  ngOnInit(): void {
    this.sendVerificationToken();
  }

  ngOnDestroy(): void {
    this.subscriptionRef.unsubscribe();
    this.cleanUpInterval();
  }

  protected sendVerificationToken(): void {
    const token = this.verificationToken();
    if (!token) {
      this.isCodeWrong.set(true);
      return;
    }

    const payload: Token = { token };

    this.loadingManager.showSpinner(AUTHENTICATION_LOADING_KEY);
    this.authenticationService
      .verifyEmail(payload)
      .pipe(finalize(() => this.loadingManager.hideSpinner(AUTHENTICATION_LOADING_KEY)))
      .subscribe((state) => {
        switch (state) {
          case EmailVerificationResponseState.Ok:
            this.startRedirectionTimeout();
            break;
          case EmailVerificationResponseState.WrongToken:
            this.isCodeWrong.set(true);
            break;
          default:
            this.isCodeWrong.set(true);
            this.openUnexpectedErrorModal();
        }
      });
  }

  protected openUnexpectedErrorModal() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(UnexpectedErrorModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }

  private startRedirectionTimeout(): void {
    this.intervalId = setInterval(() => {
      if (this.timeleft() > 1) {
        this.timeleft.update((prev) => prev--);
      } else {
        this.cleanUpInterval();
        this.timeleft.set(0);
        this.router.navigate(['/home']);
      }
    });
  }

  protected openResendVerificationEmail() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(SendEmailCodeModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }

  private cleanUpInterval(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
    }
  }
}
