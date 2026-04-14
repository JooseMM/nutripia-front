import { UserRoleTypes } from '..';

export interface AuthenticatedUser {
  userId: string;
  firstname: string;
  role: UserRoleTypes;
}
