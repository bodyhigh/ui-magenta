import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreateComponent } from '../art/create/create.component';
import { ViewCollectionComponent } from '../art/view-collection/view-collection.component';
import { ViewContactsComponent } from '../contacts/view-contacts/view-contacts.component';
import { UserGuard } from './guards/user.guard';
import { EditComponent } from '../art/edit/edit.component';
import { ArtResolver } from 'src/app/models/resolvers/artwork.resolver';

const routes: Routes = [
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [UserGuard],
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
            },
            {
                path: 'art-edit/:id',
                component: EditComponent,
                resolve: { artwork: ArtResolver }
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