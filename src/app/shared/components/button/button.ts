import { Component } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './button.css',
})
export class Button {
}
