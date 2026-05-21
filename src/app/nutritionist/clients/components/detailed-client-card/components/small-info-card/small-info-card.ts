import { Component, input } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';
import { Color, softPurple } from '../../../../../../shared';

@Component({
  selector: 'app-small-info-card',
  imports: [LucideAngularModule],
  templateUrl: './small-info-card.html',
  styleUrl: './small-info-card.css',
})
export class SmallInfoCard {
  icon = input.required<LucideIconData>();
  label = input.required<string>();
  value = input.required<string>();
  color = input<Color>(softPurple);
}
