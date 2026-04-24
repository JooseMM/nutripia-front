import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Client, ResumeClientInfo } from '..';
import { delay, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { ClientStatusEnum } from '../models/client.model';
import { LoadingManager } from '../../shared';

const mockClients: Client[] = [
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'enrique',
    id: 'id-1',
    lastname: 'contreras',
    status: ClientStatusEnum.Okay,
  },
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'luis',
    id: 'id-2',
    lastname: 'fonseca',
    status: ClientStatusEnum.Okay,
  },
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'juanete',
    id: 'id-3',
    lastname: 'perez',
    status: ClientStatusEnum.Overdue,
  },
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'miguel',
    id: 'id-4',
    lastname: 'angel',
    status: ClientStatusEnum.Overdue,
  },
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'lucia',
    id: 'id-5',
    lastname: 'martinez',
    status: ClientStatusEnum.Canceled,
  },
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'patricio',
    id: 'id-6',
    lastname: 'gomez',
    status: ClientStatusEnum.Canceled,
  },
];

const mockResumeClientInfo: ResumeClientInfo = {
  id: '',
  diagnosisList: ['Diabetes B', 'Hipertension'],
  objectiveList: ['Ganancia Muscular', 'Perdida de Peso'],
  nextAppointment: new Date(2026, 6, 5),
  previousAppointment: new Date(2026, 5, 10),
  bodyFatPercentage: 23.2,
  weight: 74,
  imc: 23.2,
  height: 162,
};

@Injectable({
  providedIn: 'root',
})
export class NutritionistClientService {
  private readonly loadingManager = inject(LoadingManager);
  private readonly _clientList: WritableSignal<Client[]> = signal([]);
  readonly clientList = this._clientList.asReadonly();

  private readonly _clientResumeInfoList: WritableSignal<ResumeClientInfo[]> = signal([]);
  readonly clientResumeInfoList = this._clientResumeInfoList.asReadonly();

  fetchClientList(loadingKey: string): void {
    this.loadingManager.showSpinner(loadingKey);
    of<Client[]>(mockClients)
      .pipe(
        delay(1000),
        tap((clients) => this._clientList.set(clients)),
        switchMap((clients: Client[]) => {
          return this.fetchResumesFromApi(clients);
        }),
        finalize(() => this.loadingManager.hideSpinner(loadingKey)),
      )
      .subscribe((resume) => this._clientResumeInfoList.set(resume));
  }

  private fetchResumesFromApi(clients: Client[]): Observable<ResumeClientInfo[]> {
    const resumes: ResumeClientInfo[] = clients.map((c) => {
      const { id, ...rest } = mockResumeClientInfo;
      return { id: c.id, ...rest };
    });
    return of(resumes).pipe(delay(1000));
  }
}
