import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NutritionistAuthenticationService {
    private readonly AUTHENTICATION_URL = `${environment.BFF_URL}/nutritionist/authentication`
}
