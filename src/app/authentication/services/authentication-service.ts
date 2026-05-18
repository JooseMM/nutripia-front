import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  AuthenticatedUser,
  EmailVerificationResponseState,
  EmailVerificationStateType,
  LoginRequestDto,
  LoginResponse,
  LoginResponseStateType,
  RegisterNutritionist,
  RegistrationResponseState,
  RegistrationStateType,
  EmailAddress,
  Token,
  UserRoles,
} from '..';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginResponseState } from '..';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
    return this.http
      .post(`${environment.BFF_URL}/authentication/nutritionist/register`, payload)
      .pipe(
        map((_) => RegistrationResponseState.Ok),
        catchError((err: HttpErrorResponse) => {
          switch (err.status) {
            case 422:
            case 400:
              return of(RegistrationResponseState.ValidationError);
            case 409:
              return of(RegistrationResponseState.EmailAlreadyPresent);
            default:
              return of(RegistrationResponseState.UnexpectedError);
          }
        }),
      );
  }

  verifyEmail(payload: Token): Observable<EmailVerificationStateType> {
    return this.http
      .post<
        BFFResponse<LoginResponse>
      >(`${environment.BFF_URL}/authentication/nutritionist/verify-email`, payload)
      .pipe(
        tap((response) => {
          this._authenticationInfo.set({
            userId: response.data.userId,
            firstname: response.data.firstname,
            role: UserRoles.Nutritionist,
          });
        }),
        map((_) => EmailVerificationResponseState.Ok),
        catchError((err: HttpErrorResponse) => {
          switch (err.status) {
            case 400:
            case 404:
            case 422:
              return of(EmailVerificationResponseState.WrongToken);
            default:
              return of(EmailVerificationResponseState.UnexpectedError);
          }
        }),
      );
  }

  resendEmailVerification(payload: EmailAddress): Observable<void> {
    return this.http.post<void>(
      `${environment.BFF_URL}/authentication/nutritionist/resend-email-verification`,
      payload,
    );
  }

  sendPasswordChangeCode(_email: EmailAddress): void {}

  verifySessionToken(): void {}

  logout(): void {
    this._authenticationInfo.set(undefined);
  }
}
