import { Component, input } from '@angular/core';
import { Color, softPurple } from '../..';

@Component({
  selector: 'app-chip-item',
  imports: [],
  templateUrl: './chip-item.html',
  styleUrl: './chip-item.css',
  host: {
    '[style.color]': 'color().color',
    '[style.backgroundColor]': 'color().background',
  },
})
export class ChipItem {
  color = input<Color>(softPurple);
}
