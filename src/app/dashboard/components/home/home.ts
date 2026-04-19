import { Component, signal } from '@angular/core';
import { MetricsCard } from '../metrics-card/metrics-card';

@Component({
  selector: 'app-home',
  imports: [MetricsCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  /*
    private readonly authenticationService = inject(AuthenticationService);
    protected readonly firstname = computed(
      () => this.authenticationService.authenticationInfo()?.firstname,
    );
  */
  protected readonly firstname = signal('Pia');

  protected getFormattedDate(): string {
    return 'Lunes, Octubre 24';
  }
}
