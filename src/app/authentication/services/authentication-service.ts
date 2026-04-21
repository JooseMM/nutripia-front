import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
  AuthenticatedUser,
  LoginRequestDto,
  LoginResponseStateType,
  RegisterNutritionist,
  RegistrationResponseState,
  RegistrationStateType,
  Token,
  UserRoles,
} from '..';
import { delay, Observable, of, tap } from 'rxjs';
import { LoginResponseState } from '..';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _authenticationInfo: WritableSignal<AuthenticatedUser | undefined> =
    signal(undefined);
  readonly authenticationInfo = this._authenticationInfo.asReadonly();

  private readonly _sessionToken: WritableSignal<string | undefined> = signal(
    localStorage.getItem(environment.CACHE_SESSION) || undefined,
  );
  readonly sessionToken = this._sessionToken.asReadonly();
  readonly isAuthenticated = computed(() => !!this.sessionToken());

  nutritionistLogin(payload: LoginRequestDto): Observable<LoginResponseStateType> {
    if (payload.emailAddress === 'wrong@example.com')
      return of(LoginResponseState.WrongCredentials).pipe(delay(1000));
    if (payload.emailAddress === 'unexpected@example.com')
      return of(LoginResponseState.UnexpectedError).pipe(delay(1000));

    this._authenticationInfo.set({
      userId: 'user-1',
      firstname: 'juanete',
      role: UserRoles.Nutritionist,
    });

    return of(LoginResponseState.Ok).pipe(
      tap(() => {
        const token = 'super-secure-session-token-key';
        this._sessionToken.set(token);
        localStorage.setItem(environment.CACHE_SESSION, token);
      }),
      delay(1000),
    );
  }

  nutritionistRegister(payload: RegisterNutritionist): Observable<RegistrationStateType> {
    let response: RegistrationStateType = RegistrationResponseState.Ok;
    if (payload.emailAddress === 'conflict@example')
      response = RegistrationResponseState.EmailAlreadyPresent;

    if (payload.emailAddress === 'unexpected@example.com')
      response = RegistrationResponseState.UnexpectedError;

    return of(response).pipe(delay(1000));
  }

  verifyEmail(payload: Token): Observable<boolean> {
    let isOkay = false;
    if (payload.token === 'REPREP') isOkay = true;

    return of(isOkay).pipe(delay(1000));
  }

  resendEmailVerification(_email: string): void {}

  sendPasswordChangeCode(_email: string): void {}

  verifySessionToken(): void {
    if (!this.sessionToken()) return;

    this._authenticationInfo.set({
      userId: 'user-1',
      firstname: 'juanete',
      role: UserRoles.Nutritionist,
    });
  }

  logout(): void {
    this._sessionToken.set(undefined);
    this._authenticationInfo.set(undefined);
  }
}
