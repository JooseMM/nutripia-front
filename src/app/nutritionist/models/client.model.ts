export const ClientStatusEnum = {
  Okay: 0,
  Overdue: 1,
  Canceled: 2,
} as const;

export type ClientStatus = (typeof ClientStatusEnum)[keyof typeof ClientStatusEnum];

export interface Client {
  id: string;
  firstname: string;
  lastname: string;
  emailAddress: string;
  birthDate: Date;
  status: ClientStatus;
}

export interface ResumeClientInfo {
  id: string;
  diagnosisList: string[];
  objectiveList: string[];
  nextAppointment: Date;
  previousAppointment: Date;
  height: number;
  weight: number;
  imc: number;
  bodyFatPercentage: number;
}
