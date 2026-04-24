import { Component, computed, effect, input, OnInit } from '@angular/core';
import { MetricInfoCard } from './components/info-card/metric-info-card';
import { ChipItem } from '../../../../shared/components/chip-item/chip-item';
import {
  Calendar1,
  CalendarCheck,
  CircleAlert,
  CircleCheck,
  LucideAngularModule,
  Mail,
  MapPin,
  Phone,
  Plus,
} from 'lucide-angular';
import { SmallInfoCard } from './components/small-info-card/small-info-card';
import {
  Color,
  softGreen,
  softPurple,
  softRed,
  softYellow,
  softGray,
  Button,
} from '../../../../shared';
import { ClientStatus, ResumeClientInfo, ClientStatusEnum } from '../../..';

@Component({
  selector: 'app-detailed-client-card',
  imports: [MetricInfoCard, ChipItem, LucideAngularModule, SmallInfoCard, Button],
  templateUrl: './detailed-client-card.html',
  styleUrl: './detailed-client-card.css',
})
export class DetailedClientCard {
  data = input<ResumeClientInfo | undefined>();
  status = input<ClientStatus | undefined>();
  fullName = input<string | undefined>();
  loading = input.required<boolean>();

  protected readonly PLUS_ICON = Plus;
  protected readonly EMAIL_ICON = Mail;
  protected readonly PHONE_ICON = Phone;
  protected readonly LOCATION_ICON = MapPin;
  protected readonly PAST_ICON = CalendarCheck;
  protected readonly FUTURE_ICON = Calendar1;

  protected readonly WARNING_ICON = CircleAlert;
  protected readonly CHECK_ICON = CircleCheck;

  protected readonly PURPLE = softPurple;
  protected readonly RED = softRed;
  protected readonly GREEN = softGreen;
  protected readonly YELLOW = softYellow;

  protected readonly statusIndicator = computed(() => {
    const status = this.status();
    switch (status) {
      case ClientStatusEnum.Okay:
        return { color: this.GREEN, text: 'Pago al dia', icon: CircleCheck };
      case ClientStatusEnum.Overdue:
        return { color: this.YELLOW, text: 'Pago con demora', icon: CircleAlert };
      case ClientStatusEnum.Canceled:
        return { color: this.RED, text: 'Subscripcion cancelada', icon: CircleAlert };
      default:
        throw new Error('Unhandle status case: ', status);
    }
  });

  protected parseToString(date: Date | undefined): string {
    if (!date) return '';

    return date.toLocaleDateString('es-ES', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  }

  protected GetColorByIndex(index: number): Color {
    const toArr = [this.PURPLE, this.RED, this.GREEN, this.YELLOW, softGray];
    return toArr[index % toArr.length];
  }
}
