import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonMaterialsModule } from '../common-materials/common-materials.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent, UsersComponent],
  imports: [
    CommonModule,
    CommonMaterialsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
