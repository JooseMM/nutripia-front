import { Component, signal, WritableSignal } from '@angular/core';
import { Funnel, LucideAngularModule, Search } from 'lucide-angular';
import { ResumeClientCard } from './components/resume-client-card/resume-client-card';
import { DetailedClientCard } from './components/detailed-client-card/detailed-client-card';
import { Client } from '..';

@Component({
  selector: 'app-clients',
  imports: [LucideAngularModule, ResumeClientCard, DetailedClientCard],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  protected readonly SEARCH_ICON = Search;
  protected readonly FILTER_ICON = Funnel;
  protected readonly clientList: WritableSignal<Client[]> = signal(clientList);
  protected readonly selectedClient: WritableSignal<number | undefined> = signal(undefined);

  protected select(index: number): void {
    this.selectedClient.set(index);
  }
}

const clientList: Client[] = [
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'juanete',
    id: 'id-1231312',
    lastname: 'perez',
  },
  {
    birthDate: new Date(1990, 4, 20),
    emailAddress: 'email@email.cl',
    firstname: 'juanete',
    id: 'id-1231312',
    lastname: 'perez',
  },
];
