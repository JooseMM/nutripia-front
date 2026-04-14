export const UserRoles = {
  Unknown: -1,
  Client: 0,
  Nutritionist: 1,
  Admin: 2,
} as const;

export type UserRoleTypes = (typeof UserRoles)[keyof typeof UserRoles];
