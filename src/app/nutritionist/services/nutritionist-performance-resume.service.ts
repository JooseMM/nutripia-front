import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BFFResponse, PossibleValue } from '../../shared';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import {
  NutritionistPerformanceResume,
  nutritionistPerformanceResumeAdapter,
  RawNutritionistPerformanceResume,
} from '../models/performance-resume.model';

@Injectable()
export class NutritionistPerformanceResumeService {
  private readonly http = inject(HttpClient);

  fetch(nutritionistId: string): Observable<PossibleValue<NutritionistPerformanceResume>> {
    return this.http
      .get<
        BFFResponse<RawNutritionistPerformanceResume>
      >(`${environment.BFF_URL}/nutritionist/resume/${nutritionistId}`)
      .pipe(map((response) => nutritionistPerformanceResumeAdapter(response.data)));
  }
}
