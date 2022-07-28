import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [UsersComponent, RolesComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
