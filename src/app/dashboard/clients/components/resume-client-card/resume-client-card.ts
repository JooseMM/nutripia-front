import { Component, input } from '@angular/core';
import { UserRound, LucideAngularModule } from 'lucide-angular';
import { InfoCard } from "./components/info-card/info-card";

@Component({
  selector: 'app-resume-client-card',
  imports: [LucideAngularModule, InfoCard],
  templateUrl: './resume-client-card.html',
  styleUrl: './resume-client-card.css',
  host: {
    '[class.selected]': 'isSelected()'
  }
})
export class ResumeClientCard {
  protected readonly USER_ICON = UserRound;
  isSelected = input<boolean>(false);
  fullname = input.required<string>();
  age = input.required<number>();
}
