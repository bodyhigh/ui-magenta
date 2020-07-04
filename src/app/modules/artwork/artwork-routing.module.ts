import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtworkCreateComponent } from './artwork-create/artwork-create.component';


const routes: Routes = [
  // {
  //   path: 'art-create',
  //   component: ArtworkCreateComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtworkRoutingModule { }
