import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Logo } from '../../../../shared/components/logo/logo';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  Dumbbell,
  Leaf,
  Apple,
  Utensils,
} from 'lucide-angular';
import { RegistrationResponseState, RegistrationStateType } from '../..';
import { LoadingSpinner } from '../../../../shared/overlay/loader/components/loading-spinner/loading-spinner';
import { LoadingManager } from '../../../../shared/overlay/loader/services/loading-manager';
import { AUTHENTICATION_LOADING_KEY } from '../../'

@Component({
  selector: 'app-authentication-layout',
  imports: [RouterLink, Logo, ReactiveFormsModule, LucideAngularModule, LoadingSpinner, RouterOutlet],
  templateUrl: './authentication-layout.html',
  styleUrl: './authentication-layout.css',
})
export class AuthenticationLayout {
  protected readonly DUMBBELL = Dumbbell;
  protected readonly LEAF = Leaf;
  protected readonly APPLE = Apple;
  protected readonly FORKS = Utensils;
  protected readonly LOADING_KEY = AUTHENTICATION_LOADING_KEY

  private readonly loadingManager = inject(LoadingManager);

  private readonly state: WritableSignal<RegistrationStateType | undefined> = signal(undefined);
  protected readonly isComplete = computed(() => this.state() === RegistrationResponseState.Ok);

  protected readonly isLoading = computed(() => this.loadingManager.isLoading(this.LOADING_KEY));
}
