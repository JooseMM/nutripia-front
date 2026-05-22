export interface AppointmentResume {
  id: string;
  date: Date;
  nutritionistId: string;
  clientName: string;
  isOnline: boolean;
  minutesDuration: number;
}

export interface NutritionistPerformanceResume {
  currentClientCount: number;
  previousClientCount: number;
  currentAppointmentCount: number;
  previousAppointmentCount: number;
  appointmentResume?: AppointmentResume;
}

export type RawAppointmentResume = Omit<AppointmentResume, 'date'> & {
  date: string;
};

export type RawNutritionistPerformanceResume = Omit<
  NutritionistPerformanceResume,
  'appointmentResume'
> & {
  appointmentResume?: RawAppointmentResume;
};

export function nutritionistPerformanceResumeAdapter(
  raw: RawNutritionistPerformanceResume,
): NutritionistPerformanceResume {
  if (raw.appointmentResume == undefined) {
    return {
      ...raw,
      appointmentResume: undefined,
    };
  }

  const date = new Date(raw.appointmentResume.date);
  if (isNaN(date.valueOf())) {
    throw new Error('Invalid next appointment date');
  }

  return {
    ...raw,
    appointmentResume: {
      ...raw.appointmentResume,
      date,
    },
  };
}
