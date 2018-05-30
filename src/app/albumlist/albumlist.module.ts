import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumlistComponent } from './albumlist.component';
import { AlbumlistRoutes } from './albumlist.routing';

@NgModule({
  imports: [
    CommonModule,
    AlbumlistRoutes
  ],
  declarations: [AlbumlistComponent]
})
export class AlbumlistModule { }
