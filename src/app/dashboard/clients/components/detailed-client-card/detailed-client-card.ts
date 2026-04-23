import { Component, computed, signal } from '@angular/core';
import { MetricInfoCard } from './components/info-card/metric-info-card';
import { ChipItem } from '../../../../shared/components/chip-item/chip-item';
import {
  Calendar1,
  CalendarCheck,
  Check,
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

@Component({
  selector: 'app-detailed-client-card',
  imports: [MetricInfoCard, ChipItem, LucideAngularModule, SmallInfoCard, Button],
  templateUrl: './detailed-client-card.html',
  styleUrl: './detailed-client-card.css',
})
export class DetailedClientCard {
  diagnosisList = ['Diabetes B', 'Hipertension'];
  goalList = ['Ganancia muscular', 'Perdida de peso'];
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

  protected readonly isOkay = signal(true);
  protected readonly statusIndicator = computed(() => {
    if (!this.isOkay()) return this.YELLOW;
    return this.GREEN;
  });

  private readonly now = new Date();
  protected readonly past = new Date(
    this.now.getFullYear(),
    this.now.getMonth() - 2,
    this.now.getDate() - 10,
  );
  protected readonly next = new Date(
    this.now.getFullYear(),
    this.now.getMonth() + 1,
    this.now.getDate() + 5,
  );

  protected parseToString(date: Date): string {
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
