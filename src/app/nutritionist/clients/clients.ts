import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Funnel, LucideAngularModule, Search } from 'lucide-angular';
import { ResumeClientCard } from './components/resume-client-card/resume-client-card';
import { DetailedClientCard } from './components/detailed-client-card/detailed-client-card';
import { NutritionistClientService } from '../services/nutritionist-client.service';
import { LoadingManager } from '../../shared';
import { Pagination } from '../../shared/components/pagination/pagination';

@Component({
  selector: 'app-clients',
  imports: [LucideAngularModule, ResumeClientCard, DetailedClientCard, Pagination],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
  providers: [NutritionistClientService],
})
export class Clients implements OnInit {
  private readonly service = inject(NutritionistClientService);
  private readonly loadingManager = inject(LoadingManager);
  private readonly LOADING_KEY = 'client-page-loading';

  protected readonly SEARCH_ICON = Search;
  protected readonly FILTER_ICON = Funnel;

  protected readonly isLoading = computed(() => this.loadingManager.isLoading(this.LOADING_KEY));

  protected readonly skeletonList = Array.from({ length: 7 }, (_, __) => undefined);
  protected readonly clientList = computed(() => this.service.clientList());
  protected readonly resumeList = computed(() => this.service.clientResumeInfoList());
  protected readonly paginationStatus = computed(() => this.service.paginationState());

  protected readonly selectedIndex: WritableSignal<number | undefined> = signal(undefined);
  protected readonly isSelected = computed(() => this.selectedIndex() != null);

  protected readonly getSelectedStatus = computed(() => {
    if (!this.isSelected()) return;
    return this.clientList()[this.selectedIndex()!].status;
  });

  protected readonly getSelectedFullName = computed(() => {
    if (!this.isSelected()) return;

    const client = this.clientList()[this.selectedIndex()!];
    return `${client.firstname} ${client.lastname}`;
  });

  protected readonly selectedClientResume = computed(() => {
    const clientList = this.clientList();
    if (!this.isSelected()) return;

    const client = clientList[this.selectedIndex()!];
    return this.resumeList().find((r) => r.id === client.id);
  });

  ngOnInit(): void {
    this.fetchList();
  }

  protected fetchList(page = 1): void {
    this.service.fetchClientList(this.LOADING_KEY, this.paginationStatus().currentPage + page);
  }

  removeSelection(): void {
    this.selectedIndex.set(undefined);
  }

  protected select(index: number): void {
    this.selectedIndex.set(index);
  }
}
