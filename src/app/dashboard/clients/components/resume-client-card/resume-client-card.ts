import { Component, input, signal } from '@angular/core';
import { UserRound, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-resume-client-card',
  imports: [LucideAngularModule],
  templateUrl: './resume-client-card.html',
  styleUrl: './resume-client-card.css',
  host: {
    '[class.selected]': 'isSelected()',
  },
})
export class ResumeClientCard {
  protected readonly USER_ICON = UserRound;
  protected readonly userProfileImage = signal("images/mock-profile.jpg");
  isSelected = input<boolean>(false);
  fullname = input.required<string>();
  age = input.required<number>();
}
