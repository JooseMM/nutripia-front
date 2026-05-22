export const EmailVerificationResponseState = {
  Ok: 0,
  WrongToken: 1,
  UnexpectedError: 3,
} as const;

export type EmailVerificationStateType =
  (typeof EmailVerificationResponseState)[keyof typeof EmailVerificationResponseState];
