import { Component, input } from '@angular/core';
import { LucideAngularModule, UsersRound } from 'lucide-angular';
import { SignPipe } from '../../../shared/pipes/sign-pipe';

@Component({
  selector: 'app-metrics-card',
  imports: [LucideAngularModule, SignPipe],
  templateUrl: './metrics-card.html',
  styleUrl: './metrics-card.css',
})
export class MetricsCard {
  protected readonly ICON = UsersRound;
  primaryColor = input.required<`#${string}`>();
  secondaryColor = input.required<`#${string}`>();
  improvementPercentage = input.required<number>();
  value = input.required<number>();
  title = input.required<string>();

  protected getProgressBar() {
    return `linear-gradient(to right, ${this.primaryColor()} ${this.improvementPercentage()}%, ${this.secondaryColor()} ${this.improvementPercentage()}%)`;
  }
}
