export const CreateClientResult = {
  Ok: 0,
  EmailAlreadyPresent: 1,
  UnexpectedError: 2,
  ValidationError: 3,
} as const;

export type CreateClientResultType = (typeof CreateClientResult)[keyof typeof CreateClientResult];
