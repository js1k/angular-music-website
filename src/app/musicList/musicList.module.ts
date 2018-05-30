
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MusicListComponent } from './musicList.component';
import { MusicListRoutes } from './musicList.routing';


@NgModule({
  imports: [
    CommonModule,
    MusicListRoutes,
    NgZorroAntdModule
  ],
  declarations: [MusicListComponent],
  providers:[]
})
export class MusicListModule { }



