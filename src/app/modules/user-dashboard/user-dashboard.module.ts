import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMaterialsModule } from '../common-materials/common-materials.module';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    CommonMaterialsModule,
    UserDashboardRoutingModule
  ],
  exports: [
    UserDashboardComponent
  ]
})
export class UserDashboardModule { }
