import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  Client,
  CreateClientPayload,
  CreateClientResult,
  CreateClientResultType,
  ResumeClientInfo,
} from '..';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { BFFResponse, Pagination } from '../../shared';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class NutritionistClientService {
  private readonly http = inject(HttpClient);

  private readonly _clientList: WritableSignal<Client[]> = signal([]);
  readonly clientList = this._clientList.asReadonly();

  private readonly _clientResumeInfoList: WritableSignal<ResumeClientInfo[]> = signal([]);
  readonly clientResumeInfoList = this._clientResumeInfoList.asReadonly();

  private readonly _paginationState: WritableSignal<Pagination> = signal({
    currentPage: 0,
    lastPage: 0,
  });
  readonly paginationState = this._paginationState.asReadonly();

  fetchClientList(page?: number): void {}

  createClient(
    payload: CreateClientPayload,
    nutritionistId: string,
  ): Observable<CreateClientResultType> {
    return this.http
      .post<
        BFFResponse<void>
      >(`${environment.BFF_URL}/nutritionist/${nutritionistId}/client`, payload)
      .pipe(
        map(() => CreateClientResult.Ok),
        catchError((err: HttpErrorResponse) => {
          switch (err.status) {
            case 422:
              return of(CreateClientResult.ValidationError);
            case 409:
              return of(CreateClientResult.EmailAlreadyPresent);
            default:
              return of(CreateClientResult.UnexpectedError);
          }
        }),
      );
  }
}
