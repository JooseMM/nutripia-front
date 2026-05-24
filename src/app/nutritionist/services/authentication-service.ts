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
  UserRoleTypes,
  LoginResponseState,
} from '..';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BFFResponse } from '../../shared/models/api-response.model';
import { PasswordReset } from '../models/password-reset.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly _authenticationInfo: WritableSignal<AuthenticatedUser | undefined> =
    signal(undefined);
  readonly authenticationInfo = this._authenticationInfo.asReadonly();

  readonly isAuthenticated = computed(() => !!this._authenticationInfo()?.userId);

  nutritionistLogin(payload: LoginRequestDto): Observable<LoginResponseStateType> {
    return this.http
      .post<
        BFFResponse<LoginResponse>
      >(`${environment.BFF_URL}/authentication/nutritionist/login`, payload)
      .pipe(
        tap((response) => {
          this._authenticationInfo.set({
            userId: response.data.userId,
            userFirstname: response.data.userFirstname,
            userRole: UserRoles.Nutritionist,
          });
        }),
        map((_) => LoginResponseState.Ok),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 500) {
            return of(LoginResponseState.UnexpectedError);
          }
          return of(LoginResponseState.WrongCredentials);
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
            userFirstname: response.data.userFirstname,
            userRole: UserRoles.Nutritionist,
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

  checkPasswordResetVerificationToken(token: string): Observable<boolean> {
    if (!token || token.length != 64) {
      return of(false);
    }

    return this.http
      .get<void>(`${environment.BFF_URL}/authentication/nutritionist/start-password-reset/${token}`)
      .pipe(
        map((_) => true),
        catchError((_) => of(false)),
      );
  }

  startPasswordReset(payload: EmailAddress): Observable<boolean> {
    return this.http
      .post<void>(
        `${environment.BFF_URL}/authentication/nutritionist/start-password-reset`,
        payload,
      )
      .pipe(
        map((_) => true),
        catchError((err: HttpErrorResponse) => {
          if (err?.status === 500) {
            return of(true);
          }
          return of(false);
        }),
      );
  }

  finishPasswordReset(payload: PasswordReset): Observable<boolean> {
    return this.http
      .post<void>(
        `${environment.BFF_URL}/authentication/nutritionist/finish-password-reset`,
        payload,
      )
      .pipe(
        map((_) => true),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 500) {
            return of(false);
          }
          return of(true);
        }),
      );
  }

  checkSession(): Observable<UserRoleTypes> {
    return this.http
      .get<
        BFFResponse<LoginResponse>
      >(`${environment.BFF_URL}/authentication/nutritionist/check-session`)
      .pipe(
        tap((response) => {
          this._authenticationInfo.set({
            userId: response.data.userId,
            userFirstname: response.data.userFirstname,
            userRole: UserRoles.Nutritionist,
          });
        }),
        map((_) => UserRoles.Nutritionist),
        catchError((_) => {
          return of(UserRoles.Unknown);
        }),
      );
  }

  logout(): void {
    this._authenticationInfo.set(undefined);
  }
}
