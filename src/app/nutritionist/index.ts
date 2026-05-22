export { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';

export { Home } from './home/home';
export { Clients } from './clients/clients';
export { Appointments } from './appointments/appointments';

export type { Appointment } from './models/appointments.model';

export {
  type Client,
  type ResumeClientInfo,
  type ClientStatus,
  ClientStatusEnum,
} from './models/client.model';

export {
  type NutritionistPerformanceResume,
  type RawNutritionistPerformanceResume,
  type RawAppointmentResume,
  type AppointmentResume,
  nutritionistPerformanceResumeAdapter,
} from './models/performance-resume.model';

export { NutritionistClientService } from './services/nutritionist-client.service';
export { NutritionistPerformanceResumeService } from './services/nutritionist-performance-resume.service';

export { PERFOMANCE_RESUME_LOADING_KEY } from './constants/constants';
