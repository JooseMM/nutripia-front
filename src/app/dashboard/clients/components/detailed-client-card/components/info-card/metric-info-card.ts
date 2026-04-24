import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-info-card',
  imports: [],
  templateUrl: './metric-info-card.html',
  styleUrl: './metric-info-card.css',
  host: {
    '[class.skeleton-glowing]': 'isLoading()',
    '[style.height]': "isLoading() ? '5rem' : 'auto' ",
    '[style.width]': "isLoading() ? '100%' : 'auto'",
  },
})
export class MetricInfoCard {
  title = input<string>();
  value = input<number>();
  metric = input<'kg' | 'cm' | '%' | ''>('');
  isLoading = input<boolean>(false);
}
