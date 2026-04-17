import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Logo } from '../../../shared';
import { Calendar1, LayoutDashboard, LogOut, LucideAngularModule, UserRound } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Logo, LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout {
  protected readonly HOME_ICON = LayoutDashboard;
  protected readonly CLIENT_ICON = UserRound;
  protected readonly APPOINTMENTS_ICON = Calendar1;
  protected readonly LOGOUT_ICON = LogOut;
  protected readonly USER_ICON = UserRound;
}
