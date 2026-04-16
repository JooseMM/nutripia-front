export const LoginResponseState = {
  Ok: 0,
  WrongCredentials: 1,
  UnexpectedError: 2,
} as const;

export type LoginResponseStateType = (typeof LoginResponseState)[keyof typeof LoginResponseState];
