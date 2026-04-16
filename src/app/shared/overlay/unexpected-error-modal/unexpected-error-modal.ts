import { OverlayRef } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';

@Component({
  selector: 'app-unexpected-error-modal',
  imports: [LucideAngularModule],
  templateUrl: './unexpected-error-modal.html',
  styleUrl: './unexpected-error-modal.css',
})
export class UnexpectedErrorModal {
  protected readonly ICON = TriangleAlert;

  overlayRef?: OverlayRef;

  close() {
    this.overlayRef?.dispose();
  }
}
