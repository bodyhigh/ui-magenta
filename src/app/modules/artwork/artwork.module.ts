import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonMaterialsModule } from '../common-materials/common-materials.module';
import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkCreateComponent } from './artwork-create/artwork-create.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { ArtworkEditComponent } from './artwork-edit/artwork-edit.component';


@NgModule({
  declarations: [ArtworkCreateComponent, ViewCollectionComponent, ArtworkEditComponent],
  imports: [
    CommonModule,
    ArtworkRoutingModule,
    ReactiveFormsModule,
    CommonMaterialsModule
  ],
  exports: [
    ArtworkCreateComponent,
    ArtworkEditComponent
  ]
})
export class ArtworkModule { }
