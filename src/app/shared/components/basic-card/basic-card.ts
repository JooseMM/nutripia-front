import { Component } from '@angular/core';

@Component({
  selector: 'div[app-basic-card]',
  imports: [],
  template: '<ng-content></ng-content>',
  styleUrl: './basic-card.css',
})
export class BasicCard {}
