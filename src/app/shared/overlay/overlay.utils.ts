import { Overlay, OverlayRef } from '@angular/cdk/overlay';

export function createBasicOverlay(overlay: Overlay): OverlayRef {
  const positionStrategy = overlay.position().global().centerVertically().centerHorizontally();

  return overlay.create({
    hasBackdrop: true,
    backdropClass: 'modal-glass-backdrop',
    positionStrategy,
    maxWidth: '90%',
    scrollStrategy: overlay.scrollStrategies.block(),
  });
}

export const VerificationCodeUsage = {
  ResetPassword: 'reset-password',
  VerifyEmail: 'verify-email',
} as const;

export type VerificationCodeUsageType =
  (typeof VerificationCodeUsage)[keyof typeof VerificationCodeUsage];
