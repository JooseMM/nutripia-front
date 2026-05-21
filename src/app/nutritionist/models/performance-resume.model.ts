export interface NutritionistPerformanceResume {
  currentClientCount: number;
  previousClientCount: number;
  currentAppointmentCount: number;
  previousAppointmentCount: number;
  nextAppointment: Date;
  nextAppointmentClientName: string;
  appointmentMinutesDuration: number;
}

export type NutritionistPerformanceResponse = Omit<
  NutritionistPerformanceResume,
  'nextAppointment'
> & {
  nextAppointment: string;
};

export function nutritionistPerformanceResumeAdapter(
  raw: NutritionistPerformanceResponse,
): NutritionistPerformanceResume {
  const nextAppointment = new Date(raw.nextAppointment);
  if (isNaN(nextAppointment.valueOf())) {
    throw new Error('Invalid next appointment date');
  }

  return {
    ...raw,
    nextAppointment,
  };
}
