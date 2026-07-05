import { OverlayRef } from '@angular/cdk/overlay';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  ClipboardCheck,
  Flag,
  Info,
  LucideAngularModule,
  ScrollText,
  UserRound,
  X,
} from 'lucide-angular';
import { Button } from '../../components/button/button';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { softGray, softPurple, softRed, softYellow } from '../../constants/useful-colors';
import { CustomInput } from '../../components/custom-input/custom-input';
import { CustomSelect } from '../../components/custom-select/custom-select';
import { LoadingManager } from '../loader/services/loading-manager';
import { LoadingSpinner } from '../loader/components/loading-spinner/loading-spinner';
import { finalize } from 'rxjs';
import {
  AuthenticationService,
  CreateClientPayload,
  CreateClientResult,
  CreateClientResultType,
  NutritionistClientService,
} from '../../../nutritionist';

@Component({
  selector: 'app-create-client-modal',
  imports: [
    LucideAngularModule,
    Button,
    ReactiveFormsModule,
    CustomInput,
    CustomSelect,
    LoadingSpinner,
  ],
  templateUrl: './create-client-modal.html',
  styleUrl: './create-client-modal.css',
})
export class CreateClientModal {
  private readonly loadingManager = inject(LoadingManager);
  private readonly authManager = inject(AuthenticationService);
  protected readonly LOADING_KEY = 'CCM';

  protected readonly COMPLETED_ICON = ClipboardCheck;
  protected readonly ERROR_ICON = Info;
  protected readonly BASIC_ICON = UserRound;
  protected readonly GOAL_ICON = Flag;
  protected readonly HISTORY_ICON = ScrollText;
  protected readonly CLOSE_ICON = X;

  protected readonly BASIC_COLOR = softPurple;
  protected readonly GOAL_COLOR = softRed;
  protected readonly HISTORY_COLOR = softYellow;
  protected readonly SOFT_GRAY = softGray;

  protected readonly SEX_OPTIONS: { id: number; value: string }[] = [
    { id: 1, value: 'Masculino' },
    { id: 2, value: 'Femenino' },
  ];

  protected readonly currentStep = signal<'BASIC' | 'SUCCESS' | 'UNEXPECTED_ERROR'>('BASIC');
  protected readonly isLoading = computed(() => this.loadingManager.isLoading(this.LOADING_KEY));
  protected readonly fb = inject(NonNullableFormBuilder);

  protected readonly basicForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    sex: [this.SEX_OPTIONS[0], Validators.required],
    emailAddress: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(12)]],
  });

  overlayRef?: OverlayRef;
  clientManager!: NutritionistClientService;

  protected close(): void {
    this.overlayRef?.dispose();
  }

  protected submit(): void {
    if (this.basicForm.invalid) {
      return;
    }
    const data = this.basicForm.getRawValue();
    const payload: CreateClientPayload = {
      emailAddress: data.emailAddress,
      birthDate: data.birthDate,
      firstname: data.firstname,
      lastname: data.lastname,
    };
    const nutritionistId = this.authManager.authenticationInfo()!.userId!;

    this.loadingManager.showSpinner(this.LOADING_KEY);
    this.clientManager
      .createClient(payload, nutritionistId)
      .pipe(finalize(() => this.loadingManager.hideSpinner(this.LOADING_KEY)))
      .subscribe((result: CreateClientResultType) => {
        switch (result) {
          case CreateClientResult.Ok:
            this.currentStep.set('SUCCESS');
            break;
          case CreateClientResult.EmailAlreadyPresent: {
            const control = this.basicForm.get('emailAddress');
            if (control) {
              control.setErrors({ emailAlreadyPresent: true });
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
              }
            }
            break;
          }
          default:
            this.currentStep.set('UNEXPECTED_ERROR');
            break;
        }
      });
  }

  protected startAgain(): void {
    this.currentStep.set('BASIC');
    this.basicForm.reset();
  }
}
