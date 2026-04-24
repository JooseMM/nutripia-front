import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Funnel, LucideAngularModule, Search } from 'lucide-angular';
import { ResumeClientCard } from './components/resume-client-card/resume-client-card';
import { DetailedClientCard } from './components/detailed-client-card/detailed-client-card';
import { NutritionistClientService } from '../services/nutritionist-client.service';
import { LoadingManager } from '../../shared';

@Component({
  selector: 'app-clients',
  imports: [LucideAngularModule, ResumeClientCard, DetailedClientCard],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients implements OnInit {
  private readonly service = inject(NutritionistClientService);
  private readonly loadingManager = inject(LoadingManager);
  private readonly LOADING_KEY = 'client-page-loading';

  protected readonly SEARCH_ICON = Search;
  protected readonly FILTER_ICON = Funnel;

  protected readonly clientList = computed(() => this.service.clientList());
  protected readonly resumeList = computed(() => this.service.clientResumeInfoList());
  protected readonly isLoading = computed(() => this.loadingManager.isLoading(this.LOADING_KEY));

  protected readonly selectedIndex: WritableSignal<number | undefined> = signal(undefined);

  protected readonly getSelectedStatus = computed(() => {
    const index = this.selectedIndex();
    if (!index) return;

    return this.clientList()[index].status;
  });

  protected readonly getSelectedFullName = computed(() => {
    const index = this.selectedIndex();
    if (!index) return;

    const client = this.clientList()[index];
    return `${client.firstname} ${client.lastname}`;
  });

  protected readonly selectedClientResume = computed(() => {
    const index = this.selectedIndex();
    const clientList = this.clientList();
    if (!index || !clientList.length) return;

    const client = clientList[index];
    console.log('changed: ', client);
    return this.resumeList().find((r) => r.id === client.id);
  });

  ngOnInit(): void {
    this.service.fetchClientList(this.LOADING_KEY);
  }

  protected select(index: number): void {
    this.selectedIndex.set(index);
  }
}
