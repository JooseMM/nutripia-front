import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../../../shared/components/logo/logo';
import { CustomInput } from '../../../../shared/components/custom-input/custom-input';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../../../shared/components/button/button';
import { CustomCheckbox } from '../../../../shared/components/custom-checkbox/custom-checkbox';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    Logo,
    CustomInput,
    ReactiveFormsModule,
    Button,
    CustomCheckbox,
    LucideAngularModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fb = inject(NonNullableFormBuilder);
  protected readonly form = this.fb.group({});
}
