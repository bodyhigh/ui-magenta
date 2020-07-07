import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ArtworkCreateComponent } from '../artwork/artwork-create/artwork-create.component';
import { ViewCollectionComponent } from '../artwork/view-collection/view-collection.component';
import { ViewContactsComponent } from '../contacts/view-contacts/view-contacts.component';
import { UserGuard } from './guards/user.guard';
import { ArtworkEditComponent } from '../artwork/artwork-edit/artwork-edit.component';
import { ArtResolver } from 'src/app/models/resolvers/artwork.resolver';

const routes: Routes = [
    {
        path: 'user-dashboard',
        component: UserDashboardComponent,
        canActivate: [UserGuard],
        children: [
            {
                path: 'art-create',
                component: ArtworkCreateComponent
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
                component: ArtworkEditComponent,
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