import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongdetailComponent } from './songdetail.component';
import { SongdetailRoutes } from './songdetail.routing';
import { SonginfoComponent } from './songinfo/songinfo.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    SongdetailRoutes,
    ShareModule
  ],
  declarations: [SongdetailComponent,
    SonginfoComponent
]
})
export class SongdetailModule { }
