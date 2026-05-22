import { AuthenticatedUser } from '..';

export interface LoginRequestDto {
  emailAddress: string;
  password: string;
}

export type LoginResponse = AuthenticatedUser & {
  userId: string;
  userFirstname: string;
  userRole: string;
};
