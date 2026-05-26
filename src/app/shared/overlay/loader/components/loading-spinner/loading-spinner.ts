import { Component, computed, inject, input } from '@angular/core';
import { LucideAngularModule, LoaderCircle } from 'lucide-angular';
import { LoadingManager } from '../../services/loading-manager';

@Component({
  selector: 'app-loading-spinner',
  imports: [LucideAngularModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  protected readonly SPINNER = LoaderCircle;
  private service = inject(LoadingManager);
  showLabel = input<boolean>(true);
  size = input<number>(60);
  customStyles = input<Record<string, string>>();

  key = input.required<string>();
  protected show = computed(() => this.service.isLoading(this.key()));
}
