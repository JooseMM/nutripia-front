import { Component, computed, input } from '@angular/core';
import { AppointmentResume } from '../../../..';
import { Button } from '../../../../../shared';
import { CalendarCheck2, Info, LucideAngularModule, PlusIcon, Video } from 'lucide-angular';

@Component({
  selector: 'app-calendar-card',
  imports: [Button, LucideAngularModule],
  templateUrl: './calendar-card.html',
  styleUrl: './calendar-card.css',
  host: {
    '[style.justifyContent]': 'appointment() ? "start" : "center"',
  },
})
export class CalendarCard {
  protected readonly ICON = Video;
  protected readonly INFO = Info;
  protected readonly EMPTY = CalendarCheck2;
  protected readonly PLUS = PlusIcon;
  appointment = input<AppointmentResume | undefined>(undefined);

  protected readonly observationList = computed(() => {
    const isOnline = this.appointment()?.isOnline;
    if (isOnline === undefined) {
      return [];
    }
    return [isOnline ? 'Presencial' : 'Teleconsulta'];
  });

  protected readonly day = computed(() => {
    const date = this.appointment()?.date;
    if (!date) {
      return 0;
    }
    return date.getDate();
  });

  protected readonly month = computed(() => {
    const date = this.appointment()?.date;
    if (!date) {
      return '';
    }

    return date.toLocaleString('es-ES', { month: 'long' }).slice(0, 3);
  });

  protected readonly hours = computed(() => {
    const appointment = this.appointment();
    if (!appointment?.date || !appointment?.minutesDuration) {
      return '00:00 - 00:00';
    }

    const startDate = appointment.date;
    const duration = appointment.minutesDuration;

    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    const startHH = startDate.getHours().toString().padStart(2, '0');
    const startMM = startDate.getMinutes().toString().padStart(2, '0');

    const endHH = endDate.getHours().toString().padStart(2, '0');
    const endMM = endDate.getMinutes().toString().padStart(2, '0');

    return `${startHH}:${startMM} - ${endHH}:${endMM}`;
  });
}
