import { Component, computed, input, output } from '@angular/core';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { BasicCard } from '../basic-card/basic-card';

@Component({
  selector: 'app-pagination',
  imports: [LucideAngularModule, BasicCard],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  protected readonly previousPage = ChevronLeft;
  protected readonly nextPage = ChevronRight;

  lastPage = input.required<number>();
  currentPage = input.required<number>();
  isLoading = input<boolean>(false);

  onChange = output<1 | -1>();

  protected readonly noNext = computed(() => this.currentPage() >= this.lastPage());
  protected readonly noPrevious = computed(() => this.currentPage() <= 1);

  protected changePage(operator: 1 | -1) {
    this.onChange.emit(operator);
  }
}
