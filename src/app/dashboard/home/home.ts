import { Component, computed, inject } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Calendar1, UsersRound } from 'lucide-angular';
import { Appointment } from '..';
import { CalendarCard } from './components/calendar-card/calendar-card';
import { MetricsCard } from './components/metrics-card/metrics-card';
import { AuthenticationService } from '../../authentication';
import { TodoList } from './components/todo-list/todo-list';

@Component({
  selector: 'app-home',
  imports: [MetricsCard, DatePipe, TitleCasePipe, CalendarCard, TodoList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly USERS = UsersRound;
  protected readonly CALENDAR = Calendar1;
  private readonly authenticationService = inject(AuthenticationService);
  protected readonly firstname = computed(
    () => this.authenticationService.authenticationInfo()?.firstname,
  );
  protected date = new Date();
  protected readonly appointmentList: Appointment[] = [
    {
      date: new Date(2026, 6, 20, 13),
      isOnline: true,
      observationList: ['Competencia dentro de un dia'],
    },
  ];
}
