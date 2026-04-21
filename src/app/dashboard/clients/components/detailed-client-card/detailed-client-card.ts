import { Component } from '@angular/core';
import { MetricInfoCard } from './components/info-card/metric-info-card';
import { ChipItem } from "../../../../shared/components/chip-item/chip-item";
import { LucideAngularModule, Plus } from "lucide-angular";

@Component({
  selector: 'app-detailed-client-card',
  imports: [MetricInfoCard, ChipItem, LucideAngularModule],
  templateUrl: './detailed-client-card.html',
  styleUrl: './detailed-client-card.css',
})
export class DetailedClientCard {
  diagnosisList = ['Diabetes B', 'Hipertension'];
  protected readonly PLUS_ICON = Plus;
}
