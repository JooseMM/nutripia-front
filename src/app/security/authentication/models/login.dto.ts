import { AuthenticatedUser } from '..';

export interface LoginRequestDto {
  emailAddress: string;
  password: string;
}

export type LoginResponseDto = AuthenticatedUser & {
  token: string;
};
