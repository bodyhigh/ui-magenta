import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommonMaterialsModule } from '../common-materials/common-materials.module';
import { ArtworkRoutingModule } from './artwork-routing.module';
import { ArtworkCreateComponent } from './artwork-create/artwork-create.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { ArtworkEditComponent } from './artwork-edit/artwork-edit.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { UnescapePipe } from 'src/app/pipes/unescape.pipe';
import { ArtworkDeleteDialogComponent } from './artwork-delete-dialog/artwork-delete-dialog.component';

@NgModule({
  declarations: [ArtworkCreateComponent, ViewCollectionComponent, ArtworkEditComponent, SafeHtmlPipe, UnescapePipe, ArtworkDeleteDialogComponent],
  imports: [
    CommonModule,
    ArtworkRoutingModule,
    ReactiveFormsModule,
    CommonMaterialsModule
  ],
  exports: [
    ArtworkCreateComponent,
    ArtworkEditComponent,
    ArtworkDeleteDialogComponent
  ],
  entryComponents: [ArtworkDeleteDialogComponent]
})
export class ArtworkModule { }
