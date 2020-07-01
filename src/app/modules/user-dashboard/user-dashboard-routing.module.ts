import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateComponent } from '../art/create/create.component';
import { ViewCollectionComponent } from '../art/view-collection/view-collection.component';
import { ViewContactsComponent } from '../contacts/view-contacts/view-contacts.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'art-create',
                component: CreateComponent
            },
            {
                path: 'view-collection',
                component: ViewCollectionComponent
            },
            {
                path: 'view-contacts',
                component: ViewContactsComponent
            }
        ]
    }//,

    // {
    //     path: '**',
    //     component: CreateComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class UserDashboardRoutingModule {}