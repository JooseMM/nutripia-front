import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { NutritionistPerformanceResponse, NutritionistPerformanceResume } from '..';
import { HttpClient } from '@angular/common/http';
import { BFFResponse } from '../../shared';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { nutritionistPerformanceResumeAdapter } from '../models/performance-resume.model';

@Injectable()
export class NutritionistPerformanceResumeService {
  private readonly http = inject(HttpClient);

  private readonly _resume: WritableSignal<NutritionistPerformanceResume | undefined> =
    signal(undefined);
  readonly resume = this._resume.asReadonly();

  fetchResume(nutritionistId: string): Observable<boolean> {
    return this.http
      .get<
        BFFResponse<NutritionistPerformanceResponse>
      >(`${environment.BFF_URL}/nutritionist/resume/${nutritionistId}`, { withCredentials: true })
      .pipe(
        map((response) => nutritionistPerformanceResumeAdapter(response.data)),
        tap((data) => this._resume.set(data)),
        map(() => true),
        catchError((_) => {
          return of(false);
        }),
      );
  }
}
