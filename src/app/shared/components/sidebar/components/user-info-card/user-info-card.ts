import { Component, computed, input } from '@angular/core';
import { UserRoles, UserRoleTypes } from '../../../../../security/authentication';

@Component({
  selector: 'app-user-info-card',
  imports: [],
  templateUrl: './user-info-card.html',
  styleUrl: './user-info-card.css',
})
export class UserInfoCard {
  firstname = input.required<string>();
  userRole = input.required<UserRoleTypes>();

  redableRole = computed(() => {
    switch (this.userRole()) {
      case UserRoles.Client:
        return 'Cliente Premium';
      case UserRoles.Nutritionist:
        return 'Nutricionista';
      default:
        throw new Error('Unhandled case: ' + this.userRole());
    }
    this.userRole;
  });
}
