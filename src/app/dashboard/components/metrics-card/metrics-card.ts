import { Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { SignPipe } from '../../../shared/pipes/sign-pipe';

@Component({
  selector: 'app-metrics-card',
  imports: [LucideAngularModule, SignPipe],
  templateUrl: './metrics-card.html',
  styleUrl: './metrics-card.css',
})
export class MetricsCard {
  icon = input.required<LucideIconData>();
  iconBackground = input.required<`#${string}`>();
  iconColor = input.required<`#${string}`>();
  improvementPercentage = input.required<number>();
  value = input.required<number>();
  title = input.required<string>();

  protected getProgressBar() {
    return `linear-gradient(to right, #675784 ${this.improvementPercentage()}%,  #F2F4F6 ${this.improvementPercentage()}%)`;
  }
}
