import { CattypeComponent } from './playlist/cattype/cattype.component';
import { DetailbyidComponent } from './detailbyid/detailbyid.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SonglistRoutes } from './songlist.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SonglistComponent } from './songlist.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  imports: [
    CommonModule,
    SonglistRoutes,
    ShareModule
  ],
  declarations: [SonglistComponent,PlaylistComponent,DetailbyidComponent,CattypeComponent],
  providers:[]
})
export class SonglistModule { }
