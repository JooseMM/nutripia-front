import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
  AuthenticatedUser,
  LoginRequestDto,
  RegisterNutritionist,
  RegistrationResponseState,
  RegistrationStateType,
  UserRoles,
} from '../';
import { delay, Observable, of } from 'rxjs';

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

  NutritionistLogin(_: LoginRequestDto): void {
    this._authenticationInfo.set({
      userId: 'user-1',
      firstname: 'juanete',
      role: UserRoles.Nutritionist,
    });

    this._sessionToken.set('super-secure-session-token-key');
  }

  NutritionistRegister(payload: RegisterNutritionist): Observable<RegistrationStateType> {
    let response: RegistrationStateType = RegistrationResponseState.Ok;
    if (payload.emailAddress === 'conflict@example')
      response = RegistrationResponseState.EmailAlreadyPresent;

    if (payload.emailAddress === 'unexpected@example.com')
      response = RegistrationResponseState.UnexpectedError;

    return of(response).pipe(delay(1000));
  }
}
