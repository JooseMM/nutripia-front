import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Calendar1, UsersRound } from 'lucide-angular';
import { CalendarCard } from './components/calendar-card/calendar-card';
import { MetricsCard } from './components/metrics-card/metrics-card';
import { TodoList } from './components/todo-list/todo-list';
import { TaskItem } from '../../models/task.model';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import {
  createBasicOverlay,
  LoadingManager,
  PossibleValue,
  UnexpectedErrorModal,
} from '../../../shared';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  NutritionistPerformanceResume,
  NutritionistPerformanceResumeService,
  AuthenticationService,
  PERFOMANCE_RESUME_LOADING_KEY,
} from '../..';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [MetricsCard, DatePipe, TitleCasePipe, CalendarCard, TodoList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected readonly USERS = UsersRound;
  protected readonly CALENDAR = Calendar1;
  private readonly overlay = inject(Overlay);
  private readonly authService = inject(AuthenticationService);
  private readonly performanceResumeService = inject(NutritionistPerformanceResumeService);
  private readonly loadingManager = inject(LoadingManager);

  private overlayRef!: OverlayRef;

  protected readonly firstname = computed(() => this.authService.authenticationInfo()?.firstname);
  protected readonly taskList: WritableSignal<TaskItem[]> = signal([]);
  protected date = new Date();
  protected performanceResume: PossibleValue<NutritionistPerformanceResume>;

  ngOnInit(): void {
    const nutritionistId = this.authService.authenticationInfo()?.userId;
    if (!nutritionistId) {
      return this.openUnexpectedErrorModal();
    }
    this.getPerformanceResume(nutritionistId);
  }

  private getPerformanceResume(nutritionistId: string): void {
    this.loadingManager.showSpinner(PERFOMANCE_RESUME_LOADING_KEY);
    this.performanceResumeService
      .fetch(nutritionistId)
      .pipe(finalize(() => this.loadingManager.hideSpinner(PERFOMANCE_RESUME_LOADING_KEY)))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.performanceResume = data
        },
        error: (err) => {
          console.log(err)
          this.openUnexpectedErrorModal();
        }
      });
  }

  protected calculatePorcentageChange(original?: number, newValue?: number): number {
    original ??= 0;
    newValue ??= 0;

    if (original === 0) {
      if (newValue === 0) return 0;
      return 100;
    }

    const change = ((newValue - original) / original) * 100;
    return Math.ceil(change);
  }

  protected openUnexpectedErrorModal() {
    this.overlayRef = createBasicOverlay(this.overlay);

    const portal = new ComponentPortal(UnexpectedErrorModal);
    const componentRef = this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());

    componentRef.instance.overlayRef = this.overlayRef;
  }
}
