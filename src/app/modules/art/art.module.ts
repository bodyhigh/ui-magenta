import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonMaterialsModule } from '../common-materials/common-materials.module';
import { ArtRoutingModule } from './art-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [CreateComponent, ViewCollectionComponent, EditComponent],
  imports: [
    CommonModule,
    ArtRoutingModule,
    ReactiveFormsModule,
    CommonMaterialsModule
  ],
  exports: [
    CreateComponent
  ]
})
export class ArtModule { }
