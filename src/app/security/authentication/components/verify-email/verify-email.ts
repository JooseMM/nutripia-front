import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { Button, LoadingManager } from '../../../../shared';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, finalize, map, Subscription, tap } from 'rxjs';
import { AUTHENTICATION_LOADING_KEY, AuthenticationService, Token } from '../..';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ResendEmailVerificationModal } from '../../../../shared';
import { createBasicOverlay } from '../../../../shared';

@Component({
  selector: 'app-verify-email',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit, OnDestroy {
  @ViewChildren('input') inputs!: QueryList<ElementRef<HTMLInputElement>>;
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly loadingManager = inject(LoadingManager);

  private readonly overlay = inject(Overlay);
  private overlayRef!: OverlayRef;

  private readonly subscriptionRef = new Subscription();

  protected readonly form = this.fb.array([
    new FormControl('', [Validators.required, Validators.maxLength(1)]),
    new FormControl('', [Validators.required, Validators.maxLength(1)]),
    new FormControl('', [Validators.required, Validators.maxLength(1)]),
    new FormControl('', [Validators.required, Validators.maxLength(1)]),
    new FormControl('', [Validators.required, Validators.maxLength(1)]),
    new FormControl('', [Validators.required, Validators.maxLength(1)]),
  ]);

  protected isCodeWrong = signal(false);

  ngOnInit(): void {
    const ref = this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          if (this.isCodeWrong()) this.isCodeWrong.set(false);
        }),
        map((values) => {
          const nextEmptyIndex = values.findIndex((v) => v === '');

          return nextEmptyIndex < 0 ? undefined : nextEmptyIndex;
        }),
      )
      .subscribe((target) => {
        if (!target) return;

        this.inputs.toArray()[target].nativeElement.focus();
      });

    this.subscriptionRef.add(ref);
  }

  ngOnDestroy(): void {
    this.subscriptionRef.unsubscribe();
  }

  takeLastCharacterOnly(event: Event, index: number): void {
    const control = this.form.controls[index];
    if (!control) return;

    const input = event.target as HTMLInputElement;
    const transformed = input.value.toUpperCase().trim();
    control.setValue(transformed.charAt(transformed.length - 1));
  }

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    const data = this.form.getRawValue();
    const token: Token = {
      token: data.join(''),
    };

    this.loadingManager.showSpinner(AUTHENTICATION_LOADING_KEY);
    this.authenticationService
      .verifyEmail(token)
      .pipe(finalize(() => this.loadingManager.hideSpinner(AUTHENTICATION_LOADING_KEY)))
      .subscribe((isOkay) => {
        if (!isOkay) {
          this.isCodeWrong.set(true);
          return;
        }

        this.router.navigate(['/home']);
      });
  }

  protected openResendVerificationEmail() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(ResendEmailVerificationModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }
}
