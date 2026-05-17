import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  AuthenticatedUser,
  LoginRequestDto,
  LoginResponse,
  LoginResponseStateType,
  RegisterNutritionist,
  RegistrationResponseState,
  RegistrationStateType,
  Token,
  UserRoles,
} from '..';
import { delay, map, Observable, of, tap } from 'rxjs';
import { LoginResponseState } from '..';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BFFResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly _authenticationInfo: WritableSignal<AuthenticatedUser | undefined> =
    signal(undefined);
  readonly authenticationInfo = this._authenticationInfo.asReadonly();

  readonly isAuthenticated = computed(() => !!this._authenticationInfo());

  nutritionistLogin(payload: LoginRequestDto): Observable<LoginResponseStateType> {
    return this.http
      .post<
        BFFResponse<LoginResponse>
      >(`${environment.BFF_URL}/authentication/nutritionist/login`, payload)
      .pipe(
        tap((response) => {
          this._authenticationInfo.set({
            userId: response.data.userId,
            firstname: response.data.firstname,
            role: UserRoles.Nutritionist,
          });
        }),
        map((response) => {
          if (response.statusCode === 422) {
            return LoginResponseState.WrongCredentials;
          } else if (response.statusCode >= 400) {
            return LoginResponseState.UnexpectedError;
          }

          return LoginResponseState.Ok;
        }),
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

  verifySessionToken(): void {}

  logout(): void {
    this._authenticationInfo.set(undefined);
  }
}
