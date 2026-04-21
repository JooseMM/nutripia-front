import { Component, computed, input } from '@angular/core';
import { Appointment } from '../../..';
import { Button } from '../../../../shared';
import { Info, LucideAngularModule, Video } from 'lucide-angular';

@Component({
  selector: 'app-calendar-card',
  imports: [Button, LucideAngularModule],
  templateUrl: './calendar-card.html',
  styleUrl: './calendar-card.css',
})
export class CalendarCard {
  protected readonly ICON = Video;
  protected readonly INFO = Info;
  appointmentOwner = input.required<string>();
  appointment = input.required<Appointment>();

  protected readonly observationList = computed(() => [
    this.appointment().isOnline ? 'Presencial' : 'Teleconsulta',
    ...this.appointment().observationList,
  ]);

  protected readonly day = computed(() => this.appointment().date.getDate());

  protected readonly month = computed(() =>
    this.appointment().date.toLocaleString('es-ES', { month: 'long' }).slice(0, 3),
  );

  protected readonly hours = computed(() => {
    const date = this.appointment().date;

    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const hhNext = ((date.getHours() + 1) % 24).toString().padStart(2, '0');

    return `${hh}:${mm} - ${hhNext}:${mm}`;
  });
}
