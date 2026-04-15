import { Component } from '@angular/core';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';

@Component({
  selector: 'app-loading-spinner',
  imports: [LucideAngularModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  protected readonly SPINNER = LoaderCircle
}
