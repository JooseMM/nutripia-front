import { Component, computed, input, output, signal } from '@angular/core';
import { UserRound, LucideAngularModule, CircleAlert } from 'lucide-angular';
import { Button, softYellow } from '../../../../shared';
import { ClientStatus, ClientStatusEnum } from '../../../models/client.model';

@Component({
  selector: 'app-resume-client-card',
  imports: [LucideAngularModule, Button],
  templateUrl: './resume-client-card.html',
  styleUrl: './resume-client-card.css',
  host: {
    '[class.selected]': 'isSelected()',
  },
})
export class ResumeClientCard {
  isSelected = input<boolean>(false);
  fullname = input<string>('');
  age = input<number>(0);
  status = input<ClientStatus>(ClientStatusEnum.Okay);
  isLoading = input<boolean>(false);

  onSelected = output<void>();

  protected readonly WARNING_COLOR = softYellow;
  protected readonly WARNING_ICON = CircleAlert;
  protected readonly USER_ICON = UserRound;
  protected readonly userProfileImage = signal('images/mock-profile.jpg');

  protected readonly showWarning = computed(() => this.status() !== ClientStatusEnum.Okay);

  protected select(): void {
    this.onSelected.emit();
  }
}
