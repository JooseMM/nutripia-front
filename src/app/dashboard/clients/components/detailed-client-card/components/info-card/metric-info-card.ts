import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-info-card',
  imports: [],
  templateUrl: './metric-info-card.html',
  styleUrl: './metric-info-card.css',
})
export class MetricInfoCard {
  title = input<string>();
  value = input<number>();
  metric = input<'kg' | 'cm' | '%' | ''>('');
}
