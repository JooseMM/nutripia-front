import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
  AuthenticatedUser,
  LoginRequestDto,
  RegisterNutritionist,
  RegistrationState,
  RegistrationStateType,
  UserRoles,
} from '../';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _authenticationInfo: WritableSignal<AuthenticatedUser | undefined> =
    signal(undefined);
  readonly authenticationInfo = this._authenticationInfo.asReadonly();

  private readonly _sessionToken: WritableSignal<string | undefined> = signal(undefined);
  readonly sessionToken = this._sessionToken.asReadonly();
  readonly isAuthenticated = computed(() => !!this.sessionToken);

  protected NutritionistLogin(_: LoginRequestDto): void {
    this._authenticationInfo.set({
      userId: 'user-1',
      firstname: 'juanete',
      role: UserRoles.Nutritionist,
    });

    this._sessionToken.set('super-secure-session-token-key');
  }

  protected NutritionistRegister(payload: RegisterNutritionist): Observable<RegistrationStateType> {
    if (payload.emailAddress === 'example@example.com')
      return of(RegistrationState.EmailAlreadyPresent);

    return of(RegistrationState.Ok);
  }
}
