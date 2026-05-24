import { OverlayRef } from '@angular/cdk/overlay';
import { Component, computed, inject, signal } from '@angular/core';
import { Flag, LucideAngularModule, ScrollText, UserRound, X } from 'lucide-angular';
import { Button } from '../../components/button/button';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { softGray, softPurple, softRed, softYellow } from '../../constants/useful-colors';
import { CustomInput } from '../../components/custom-input/custom-input';
import { CustomSelect } from '../../components/custom-select/custom-select';

@Component({
  selector: 'app-create-client-modal',
  imports: [LucideAngularModule, Button, ReactiveFormsModule, CustomInput, CustomSelect],
  templateUrl: './create-client-modal.html',
  styleUrl: './create-client-modal.css',
})
export class CreateClientModal {
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

  protected readonly currentStep = signal<'BASIC' | 'GOAL' | 'HISTORY'>('BASIC');
  protected readonly fb = inject(NonNullableFormBuilder);
  protected readonly currentColor = computed(() => {
    switch (this.currentStep()) {
      case 'BASIC':
        return this.BASIC_COLOR;
      case 'GOAL':
        return this.GOAL_COLOR;
      case 'HISTORY':
        return this.HISTORY_COLOR;
    }
  });

  protected readonly curretStepIcon = computed(() => {
    switch (this.currentStep()) {
      case 'BASIC':
        return this.BASIC_ICON;
      case 'GOAL':
        return this.GOAL_ICON;
      case 'HISTORY':
        return this.HISTORY_ICON;
    }
  });

  protected readonly curretStepTitle = computed(() => {
    switch (this.currentStep()) {
      case 'BASIC':
        return 'Información Basica';
      case 'GOAL':
        return 'Objetivos Principales';
      case 'HISTORY':
        return 'Antecedentes Importantes';
    }
  });

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

  protected back(): void {
    switch (this.currentStep()) {
      case 'GOAL':
        this.currentStep.set('BASIC');
        break;
      case 'HISTORY':
        this.currentStep.set('GOAL');
        break;
    }
  }

  protected submit(): void {
    switch (this.currentStep()) {
      case 'BASIC':
        if (this.basicForm.invalid) {
          return;
        }
        console.log(this.basicForm.getRawValue());
        break;
    }
  }

  protected areFormsInvalid(): boolean {
    return this.basicForm.invalid;
  }
}
