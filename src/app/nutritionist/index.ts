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

export type {
  NutritionistPerformanceResume,
  NutritionistPerformanceResponse,
} from './models/performance-resume.model';

export { NutritionistClientService } from './services/nutritionist-client.service';
