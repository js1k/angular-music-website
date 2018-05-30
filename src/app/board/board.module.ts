import { BoardplaylistComponent } from './boardplaylist/boardplaylist.component';
import { BoardlistComponent } from './boardlist/boardlist.component';
import { BoardRoutes } from './board.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  imports: [
    CommonModule,
    BoardRoutes,
    ShareModule
  ],
  declarations: [BoardComponent,BoardlistComponent,BoardplaylistComponent]
})
export class BoardModule { }
