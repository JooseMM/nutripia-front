import { Component, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Button, Logo } from '../../../shared';
import {
  Calendar1,
  LayoutDashboard,
  LogOut,
  LucideAngularModule,
  Menu,
  UserRound,
  X,
} from 'lucide-angular';
import { AuthenticationService } from '../..';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Logo, LucideAngularModule, RouterLink, RouterLinkActive, Button],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css',
})
export class DashboardLayout implements OnInit {
  protected readonly HOME_ICON = LayoutDashboard;
  protected readonly CLIENT_ICON = UserRound;
  protected readonly APPOINTMENTS_ICON = Calendar1;
  protected readonly LOGOUT_ICON = LogOut;
  protected readonly USER_ICON = UserRound;
  protected readonly CLOSE_ICON = X;
  protected readonly MENU_ICON = Menu;

  private readonly authenticationService = inject(AuthenticationService);

  protected readonly isDrawerOpen = signal(true);
  protected readonly animateIcon = signal(false);

  ngOnInit(): void {
    this.authenticationService.checkSession();
  }

  constructor() {
    effect(() => {
      this.isDrawerOpen();

      untracked(() => this.animateIcon.set(true));

      const timeout = setTimeout(() => {
        this.animateIcon.set(false);
      }, 300);

      return () => clearTimeout(timeout);
    });
  }

  protected toggleDrawerState(): void {
    this.isDrawerOpen.update((prev) => !prev);
  }

  protected logout(): void {
    this.authenticationService.logout();
  }
}
