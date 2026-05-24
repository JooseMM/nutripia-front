import { UserRoleTypes } from '..';

export interface AuthenticatedUser {
  userId: string;
  userFirstname: string;
  userRole: UserRoleTypes;
}
