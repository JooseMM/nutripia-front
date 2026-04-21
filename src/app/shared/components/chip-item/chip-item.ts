import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chip-item',
  imports: [],
  templateUrl: './chip-item.html',
  styleUrl: './chip-item.css',
  host: {
    '[class.red]': "color() === 'red'",
    '[class.blue]': "color() === 'blue'",
    '[class.green]': "color() === 'green'",
    '[class.purple]': "color() === 'purple'",
  },
})
export class ChipItem {
  name = input.required<string>();
  color = input<'red' | 'blue' | 'green' | 'purple'>('red');
}
