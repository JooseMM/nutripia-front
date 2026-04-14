export const RegistrationState = {
  Ok: 0,
  EmailAlreadyPresent: 1,
  ValidationError: 2,
  UnexpectedError: 3,
} as const;

export type RegistrationStateType = (typeof RegistrationState)[keyof typeof RegistrationState];
