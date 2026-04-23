import { Component, input } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './button.css',
  host: {
    '[class.secondary]': 'isSecondary()',
  },
})
export class Button {
  isSecondary = input<boolean>(false);
}
