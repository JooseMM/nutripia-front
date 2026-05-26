import { OverlayRef } from '@angular/cdk/overlay';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  CircleCheckBig,
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
import { delay, finalize, of } from 'rxjs';

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
  protected readonly LOADING_KEY = 'CCM';

  protected readonly COMPLETED_ICON = CircleCheckBig;
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

  protected readonly currentStep = signal<'BASIC' | 'SUCCESS' | 'SERVER_ERROR'>('BASIC');
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

  protected close(): void {
    this.overlayRef?.dispose();
  }

  protected submit(): void {
    console.log(this.basicForm.invalid);
    if (this.basicForm.invalid) {
      return;
    }
    this.loadingManager.showSpinner(this.LOADING_KEY);
    of(undefined)
      .pipe(
        delay(3000),
        finalize(() => this.loadingManager.hideSpinner(this.LOADING_KEY)),
      )
      .subscribe(() => {
        this.currentStep.set('SERVER_ERROR');
      });
  }

  protected startAgain(): void {
    this.currentStep.set('BASIC');
    this.basicForm.reset();
  }
}
