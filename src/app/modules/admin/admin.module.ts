import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonMaterialsModule } from '../common-materials/common-materials.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './user-edit/user-edit.component';


@NgModule({
  declarations: [AdminDashboardComponent, AdminComponent, UsersComponent, UserEditComponent],
  imports: [
    CommonModule,
    CommonMaterialsModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
