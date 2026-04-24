export interface BodyMeasurement {
  id: number;
  mass: number;
  stature: number;
  sittingHeight: number;
  armSpan: number;

  /* SkinFolds */
  triceps: number;
  subscapular: number;
  biceps: number;
  iliacCrest: number;
  supraspinale: number;
  abdominal: number;
  frontThigh: number;
  medialCalf: number;

  /* Girths */
  head: number;
  neck: number;
  armRelaxed: number;
  armFlex: number;
  forearm: number;
  wrist: number;
  chest: number;
  waist: number;
  hip: number;
  thighHigh: number;
  thighLow: number;
  calf: number;
  ankle: number;

  createdAt: Date;
  clientId: string;
}
