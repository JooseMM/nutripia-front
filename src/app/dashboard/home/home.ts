import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { Calendar1, UsersRound } from 'lucide-angular';
import { Appointment } from '..';
import { CalendarCard } from './components/calendar-card/calendar-card';
import { MetricsCard } from './components/metrics-card/metrics-card';
import { AuthenticationService } from '../../authentication';
import { TodoList } from './components/todo-list/todo-list';
import { TaskItem, TaskPrioritiesEnum } from '../models/task.model';

@Component({
  selector: 'app-home',
  imports: [MetricsCard, DatePipe, TitleCasePipe, CalendarCard, TodoList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
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

  ngOnInit(): void {
    this.authenticationService.verifySessionToken();
  }

  protected readonly taskList: WritableSignal<TaskItem[]> = signal([
    {
      id: 'some-1',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
    {
      id: 'some-2',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
    {
      id: 'some-2',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
    {
      id: 'some-2',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
    {
      id: 'some-2',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
    {
      id: 'some-2',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
    {
      id: 'some-2',
      title: 'Actualizacion de Dieta',
      description: 'Agregar cambios solicitados',
      priority: TaskPrioritiesEnum.High,
      isCompleted: false,
      createdAt: new Date(),
      completedAt: null,
    },
  ]);
}
