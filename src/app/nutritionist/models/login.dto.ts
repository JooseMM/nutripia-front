import { AuthenticatedUser } from '..';

export interface LoginRequestDto {
  emailAddress: string;
  password: string;
}

export type LoginResponse = Omit<AuthenticatedUser, 'userRole'>;
