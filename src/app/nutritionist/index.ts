export { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';

export { Home } from './pages/home/home';
export { Clients } from './pages/clients/clients';
export { Appointments } from './pages/appointments/appointments';

export type { Appointment } from './models/appointments.model';

export {
  type Client,
  type ResumeClientInfo,
  type ClientStatus,
  ClientStatusEnum,
} from './models/client.model';

export {
  type NutritionistPerformanceResume,
  type RawNutritionistPerformanceResume,
  type RawAppointmentResume,
  type AppointmentResume,
  nutritionistPerformanceResumeAdapter,
} from './models/performance-resume.model';

export { NutritionistClientService } from './services/nutritionist-client.service';
export { NutritionistPerformanceResumeService } from './services/nutritionist-performance-resume.service';

export { PERFOMANCE_RESUME_LOADING_KEY } from './constants/dashboard-constants';

/* Models */
export type { UserRoleTypes } from './models/role.models';
export type { AuthenticatedUser } from './models/authenticated-user.models';
export type { LoginResponse, LoginRequestDto } from './models/login.dto';
export type { RegisterNutritionist } from './models/register.dto';
export type { RegistrationStateType } from './models/registration-response-state.enum';
export {
  type EmailVerificationStateType,
  EmailVerificationResponseState,
} from './models/email-verification-response-state.enum';
export type { LoginResponseStateType } from './models/login-response-state.enum';
export type { Token } from './models/token.dto';
export { LoginResponseState } from './models/login-response-state.enum';
export { RegistrationResponseState } from './models/registration-response-state.enum';
export { UserRoles } from './models/role.models';
export type { EmailAddress } from './models/resend-email-verification.dto';
export { CreateClientResult, type CreateClientResultType } from './models/create-client.enum';
export { type CreateClientPayload } from './models/create-client.model';

/* Services */
export { AuthenticationService } from './services/authentication-service';

/* Constants */
export {
  AUTHENTICATION_LOADING_KEY,
  MIN_PASSWORD_LENGTH,
  PASSWORD_PATTERN,
} from './constants/authentication-constants';

/* Layout */
export { AuthenticationLayout } from './layouts/authentication-layout/authentication-layout';

/* Components */
export { Login } from './pages/login/login';
export { Register } from './pages/register/register';
export { VerifyEmail } from './pages/verify-email/verify-email';
export { ResetPassword } from './pages/reset-password/reset-password';

export { credentialsInterceptor } from './interceptors/auth.interceptor';
